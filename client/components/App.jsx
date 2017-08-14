import React from 'react';
import Services from './Services.jsx';
import Calendar from './Calendar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Book me</h1>
        <Calendar />
      </div>
    );
  }
}
