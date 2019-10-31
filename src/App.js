import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {

  state = {
    pets:[]
  }

  componentDidMount(){
    this.getInfo()
  }

  getInfo = ()=>{
    axios.get('/pets')
    .then((result)=>{
      result.data.map((pet)=>{
        this.setState({
          pets: [...this.state.pets, pet]
        })
      })
      console.log(this.state.pets)
    }).catch((err)=>{
      console.log(err);
    })
    this.setState({state: this.state})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.pets.map((pet)=>{
            return(
                <p key={pet.id} >{pet.petName}</p>
            )
          })}
        </header>
      </div>
    );
  }
}


export default App;
