import React, { Component } from 'react'
import logo from './logo.svg'
import firebase from 'firebase'
import './App.css'
import credentials from "./credentials"
import { throws } from 'assert';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showToast: false,
      toastText: "No text specified"
    }
    firebase.initializeApp(credentials.CONFIG);
  }

  componentDidMount = () => {
    const messaging = firebase.messaging()

    messaging.requestPermission()
    .then(() => {
      console.log('Permission granted')
      return messaging.getToken()
    })
    .then((token) => {
      console.log("sending token:", token) // Should be send to backend in the future
      const data = {
        registrationToken: token
      }
      return fetch("http://localhost:3001/new_user", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    })
    .then(async response => console.log(await response.json()))
    .catch(() => {
      console.log('Permission denied')
    })

    messaging.onMessage((payload)=>{
      this.setState({ showToast: true, toastText: payload.notification.body })
      window.setTimeout(() => {
        this.setState({ showToast: false })
      }, 3000)
    })
  }

  sayHi = () => {
    
  }

  render() {
    return (
      <>
        <div className="App">Just in console for now</div>
        <div id="snackbar" className={`${this.state.showToast ? "show" : ""}`}>{this.state.toastText}</div>
      </>
    );
  }
}

export default App;