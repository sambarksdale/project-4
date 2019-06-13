import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import {authenticateUser, newUser} from './util'
import Cricket from './components/Cricket.js'
import UserSelect from './components/UserSelect'
import User from './components/User.js'

class App extends Component {

  state = {
    player1: {
      p1_userName: "player 1",
      p1_id: "",
      loggedIn: false,
    },
    player2: {
      p2_userName: "player 2",
      p2_id: "",
      loggedIn: false
    },
    gametype: ""
  }

  userLogin = (data,player)=>{
    return authenticateUser(data)
      .then((user)=>{
        if (user === "failed"){alert("failed")}
        else if(player === "player 1"){
          this.setPLayer1(user)
        }

      })
  }

  userSignup = (data,player)=>{
    return newUser(data)
      .then(user=>{
        if (user === "failed"){alert("failed")}
        else if(player === "player 1"){
          this.setPLayer1(user)
        }
      })
  }

  setPLayer1 = (user)=>{
    let username = user[0].username
    let id = user[0].id
    let player1 = {...this.state.player1}
    player1.p1_userName = username
    player1.p1_id = id
    player1.loggedIn = true
    this.setState({player1})
  }

  setPLayer2 = (user)=>{
    let username = user[0].username
    let id = user[0].id
    let player2 = {...this.state.player2}
    player2.p2_userName = username
    player2.p2_id = id
    player2.loggedIn = true
    this.setState({player2})
  }


  render(){
    const CricketGame = ()=>(<Cricket
      state={this.state}
    />)
    const UserProfile = (props)=>(<User
      user={props}
    />)
    return (
      <Router>
        <div className="App">
          <div>
            <UserSelect userLogin={this.userLogin} userSignup={this.userSignup} player={this.state.player1}/>
            <Switch>
              <Route exact path="/cricket" render={CricketGame}/>
              <Route exact path="/user/:id" render={UserProfile}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
