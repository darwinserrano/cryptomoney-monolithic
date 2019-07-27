import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';
import config from '../config';
import openSocket from 'socket.io-client';
import ItemReport from './ItemReport';

export default class Report extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.socket = null
  }

  componentDidMount = async () => {
    const resp = await Axios.get(`/data`)
    this.setState({ data: resp.data })

    this.socket = openSocket(config.apiUrl);
    this.socket.on('cryptomoney-realtime', (value) => {
      const jsonValue = JSON.parse(value)
      this.setState(prevState => ({
        data: prevState.data.map(row => (row.id === jsonValue.id
          ? jsonValue
          : row))
      }))

    })
  }

  render() {
    const { data } = this.state

    return (
      <div>
        <Table size="sm">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Precio
              </th>
              <th>
                Min. 24h
              </th>
              <th>
                Max. 24h
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (<ItemReport key={row.symbol} record={row} />))}
          </tbody>
        </Table>
      </div>
    )
  }
}
