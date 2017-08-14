import React from 'react';
import axios from 'axios';

import { apiUrl } from '../config.json';
import { makeApi } from '../lib/utils';

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${apiUrl}/tbl_services?filter=location_id,eq,7`)
      .then(makeApi)
      .then(api => {

        console.log(api.columns)
        console.log(api.rows)

        //this.setState({services});
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
