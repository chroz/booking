import React from 'react';
import axios from 'axios';

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8100/api.php/tbl_services?filter=location_id,eq,7')
      .then(res => {
        let temp = res.data.tbl_services.records;

        let services = [];
        for (var i = 0; i < temp.length; i++) {
          let service = temp[i];
          let id = service[0];
          if (i > 3) break;
          services[id] = service;
          services[id]['rooms'] = [];
        }
        this.setState({services});
      });
  }

  render() {
    return (
      <div>
        {this.state.services.map((e, i) => {
          return (
            <button key={i}>
              {e[2]}
            </button>
          );
        })}
      </div>
    );
  }
}
