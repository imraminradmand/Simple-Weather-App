import React, {Component} from 'react'


class Modal extends Component {

    render() {
        return(
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.props.cityName}</h4>
            <p>High: {this.props.high} °C - Low: {this.props.low} °C</p>
            <p>{this.props.weather} <img src={this.props.iconUrl}/></p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
        )
    }

}


export default Modal