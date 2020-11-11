import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      comments:'',
      start_time:'',


    }
  }

  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   fetch(`/api/v1/patients/doses/${id}/`)
  //   .then(response => response.json())
  //   .then(data => this.setState({...data}), console.log(data));
  // }



  render() {

      return(
          <div>
          <div className="form-group">
                <label htmlFor='date'className="bday">Todays Date</label>
                <input type="date" id='date' name="date" value={this.state.date} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor='start_time'className="sTime">Start Time</label>
                <input type="time" id='start_time' name="start_time" value={this.state.start_time} onChange={this.handleChange} />
              </div>

              <div>
              <button type="button">Generate</button>
              </div>

        
          </div>
      )
    }
  }
  export default Schedule;
