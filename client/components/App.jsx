import React from 'react';
import Booking from './Booking.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Book me</h1>
        <Booking />
      </div>
    );
  }
}
