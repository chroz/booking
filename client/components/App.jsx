import React from 'react';
import Services from './Services.jsx';
import Calendar from './Calendar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceId: 20,
    };
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Book me</h1>
        <Services />
        <Calendar serviceId={this.state.serviceId} />
      </div>
    );
  }
}
