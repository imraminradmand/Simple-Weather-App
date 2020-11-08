import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = {
      temp: "",
      cityName:'',
      weather: '',
      high:'',
      low:'',
      icon:''
    }
  }

  componentDidMount() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=381e045e4c2c96594b3f565f73e49cbb`
    axios.get(url).then((resp)=>{
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })
    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems);
  }

  searchCity = (e) =>{
    e.preventDefault();
    const city = document.getElementById('city').value
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=381e045e4c2c96594b3f565f73e49cbb`
    axios.get(url).then((resp)=>{
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })
  }

  render() {
    const iconUrl = `https://openweathermap.org/img/w/${this.state.icon}.png`
  return (
      <div className="App">
        <h1>My Weather App</h1>
        <div className='row'>
          <div className=' col s6 offset-s3'>
          <h1> {this.state.temp} °C</h1>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">More Info</a>
          <form onSubmit={this.searchCity}>
            <input type='text' id='city' placeholder='London' />
          </form>
        </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p>High: {this.state.high} °C - Low: {this.state.low} °C</p>
            <p>{this.state.weather} <img src={iconUrl}/></p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
