import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import icon from './icon.svg'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import Headers from './Headers';
import Modal from './Modal'


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
    this.getCityWeather('London')
    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems);
  }

  searchCity = (e) =>{
    e.preventDefault();
    const city = document.getElementById('city').value
    this.getCityWeather(city)
  }

  getCityWeather = (city) => {
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
        <h1 className='title'>My Weather App</h1>
        <img className='icon' src={icon}/>
        <div className='row'>
          <div className=' col s6 offset-s3'>
            <Headers temp={this.state.temp}  />
            <a className="waves-effect waves-light btn modal-trigger" href="#modal1">More Info</a>
            <div className='form'>
              <form onSubmit={this.searchCity}>
                <input className='text' type='text' id='city' placeholder='London' />
                <Button onClick={this.searchCity}>Search</Button>
              </form>
            </div>
          </div>
        </div>
        <Modal iconUrl={iconUrl} weather={this.state.weather} 
        cityName={this.state.cityName} low={this.state.low} high={this.state.high}/>
      </div>
    );
  }
}
export default App;
