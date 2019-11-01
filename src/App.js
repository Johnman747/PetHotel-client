import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {

  state = {
      pets: [],
    addPet: {  
      breed: '',
      checked_in_date: null,
      is_checked_in: false,
      color: '',
      pet_name: '',
      owner_id: 1
    },
    owner_name: ''
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

  postInfo = (event) => {
    event.preventDefault();
    console.log('this is state', this.state.addPet.pet_name);
    // axios.post('/owners', this.state.owner_name).then((response) => {  
    //   console.log('posting owner', response)
    //   }).catch(error => {
    //     console.log('error with posting owner', error);
    //   });
      axios.post('/pets', this.state.addPet).then(response => {
        console.log('posting to pets', response)
    }).catch(error => {
      console.log('error with posting pet', error)
    });
}


  handleChange = (event, input) => {
    event.preventDefault();
    this.setState({
      addPet:{
        ...this.state.addPet,
        [input]: event.target.value
      }
    });
  }

  handleOwnerChange = (event, input) => {
    event.preventDefault();
    this.setState({
      owner_name: event.target.value
    })
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

      <form onSubmit={this.postInfo}>
      <input onChange={(event) => this.handleChange(event, 'pet_name')} value={this.state.addPet.pet_name} type="text" placeholder="pet name"/>
        <input onChange={(event) => this.handleChange(event, 'breed')} value={this.state.addPet.breed} type="text" placeholder="breed"/>
        <input onChange={(event) => this.handleChange(event, 'color')} value={this.state.addPet.color} type="text" placeholder="color"/>
        Checked in?
        <input onChange={(event) => this.handleChange(event, 'check_in_status')} value={this.state.addPet.is_checked_in} type="checkbox" placeholder="check in status"/>
        <br/>
        {/* <input onChange={(event) => this.handleChange(event, 'check_in_date')} value={this.state.addPet.check_in_date} type="date" placeholder="check in date"/>
        <br/> */}
       
        <input onChange={(event) => this.handleOwnerChange(event, 'owner_name')} value={this.state.owner_name} type="text" placeholder="owner name"/>
        <br/>
        <input type="submit" placeholder="Submit"/>
      </form>
      </div>
    );
  }
}


export default App;
