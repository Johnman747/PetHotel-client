import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {

  state = {
    pets: []
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo = () => {
    axios.get('/pets')
      .then((result) => {
        result.data.map((pet) => {
          this.setState({
            pets: [...this.state.pets, pet]
          })
        })
        console.log(this.state.pets)
      }).catch((err) => {
        console.log(err);
      })
    this.setState({ state: this.state })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <thead>
              <tr>
                <th>Breed</th>
                <th>Check in date</th>
                <th>Check in status</th>
                <th>Color</th>
                <th>Owner Name</th>
                <th>Pet Name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.pets.map((pet) => {
              return (
                <tr key={pet.id} >
                  <td>{pet.breed}</td>
                  <td>{pet.checkedInDate}</td>
                  <td>{pet.checkedInStatus?
                    <button>True</button>
                    :
                    <button>False</button>
                  }
                  </td>
                  <td>{pet.color}</td>
                  <td>{pet.ownerName}</td>
                  <td>{pet.petName}</td>
                </tr>
              )
            })}
            </tbody>
          </table>

        </header>
      </div>
    );
  }
}


export default App;
