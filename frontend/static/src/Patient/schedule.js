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

  componentDidMount() {
    console.log(this.props.match.params.id)
    // const id = this.props.match.params.id;
    // fetch(`/api/v1/patients/doses/${id}/`)
    // .then(response => response.json())
    // .then(data => this.setState({...data}));
  }

  async createSchedule

  render() {
      this.medications.forEach(medication => {
        const last_dose = medication.doses.slice(-1);
        if(last_dose.length) {
          medication.next_dose = last_dose[0].time + medication.hrly_freq;
        } else {
          medication.next_dose = medication.first_dose;
        }
        medication.doses.forEach(dose => dose.medication = medication.name);
      });
      this.medications.sort((a, b) => a.next_dose - b.next_dose);
      const schedule = this.medications.map((medication, index) => (
        <div key={index}>
          <div>{medication.name}</div>
          <div>{medication.next_dose}</div>
        </div>
      ));
      const history = this.medications
        .filter(medication => medication.doses.length)
        .flatMap((medication, index) => medication.doses)
        .sort((a,b) => b.time - a.time)
        .map((medication, index) => (
          <div key={index}>
            <div>{medication.medication}</div>
            <div>{medication.time}</div>
            <div>{medication.comments}</div>
          </div>
        ));
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

            <div>{schedule}</div>
            <br/>
            <div>{history}</div>
          </div>
      )
    }
  }
  export default Schedule;
