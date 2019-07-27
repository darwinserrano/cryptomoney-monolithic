import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatNumber } from '../utils';

export const Directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  EQ: 'EQ'
}

export default class ItemReport extends Component {
  static propTypes = {
    record: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      classPrimary: null,
      direction: null
    }
  }

  componentDidUpdate(prevProps) {
    const { record } = this.props
    if (prevProps.record !== record) {
      this.setState({
        classPrimary: "table-primary",
        direction: record.current_price > prevProps.record.current_price
          ? Directions.UP
          : record.current_price < prevProps.record.current_price
            ? Directions.DOWN
            : Directions.EQ
      }, () => {
        setTimeout(() => {
          this.setState({ classPrimary: null })
        }, 1500);
      })
    }
  }

  render() {
    const { record } = this.props
    const { classPrimary, direction } = this.state

    return (
      <tr className={classPrimary}>
        <td>
          <img src={record.image} alt={record.name} style={{ width: 20 }} />
          <span className="pl-2">{record.name}</span>
        </td>
        <td>
          <span className="mx-1">
            {direction === Directions.UP && (<i className="fas fa-arrow-circle-up text-success"></i>)}
            {direction === Directions.DOWN && (<i className="fas fa-arrow-circle-down text-danger"></i>)}
            {direction === Directions.EQ && (<i className="fas fa-equals"></i>)}
          </span>
          {formatNumber(record.current_price, 6)}
        </td>
        <td>
          {formatNumber(record.low_24h, 6)}
        </td>
        <td>
          {formatNumber(record.high_24h, 6)}
        </td>
      </tr>
    )
  }
}
