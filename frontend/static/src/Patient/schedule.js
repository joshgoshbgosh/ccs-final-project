import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time:'',
      stop_time:'',
    }
  }

render() {
  return (

    <React.Fragment>
    <div className="form-group">
      <label htmlFor='date'className="bday">Todays Date</label>
      <input type="date" id='date' name="date" value={this.state.date} onChange={this.handleChange} />
    </div>
    <div>
    <div className="form-group">
      <label htmlFor='start_time'className="sTime">Start Time</label>
      <input type="time" id='start_time' name="start_time" value={this.state.start_time} onChange={this.handleChange} />
    </div>
    <div className="form-group">
      <label htmlFor='stop_time'className="bday">Stop Time</label>
      <input type="date" id='stop_time' name="stop_time" value={this.state.stop_time} onChange={this.handleChange} />
    </div>
    </div>
    <div>
    <button type="button">Generate</button>
    </div>




    </React.Fragment>
  )
}

}
export default Schedule;
