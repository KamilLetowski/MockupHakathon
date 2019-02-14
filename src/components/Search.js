import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { InputGroup, Input, Label, Col } from 'reactstrap';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: [],
      searchValue: '',
      sortedValue: 'registrationNumber',
      isAnomaly: false
    };

    this.searchValueChanged = this.searchValueChanged.bind(this);
    this.sortedValueChanged = this.sortedValueChanged.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
  }

  componentWillMount = () => {
    axios.get('/data.json').then(response => {
      this.setState({
        statistics: response.data
      });
    });
  };

  displayStatistics = () =>
    this.state.statistics.map((statistic, i) => {
      if (this.state.isAnomaly) {
        if (
          statistic[this.state.sortedValue]
            .toString()
            .toLowerCase()
            .includes(this.state.searchValue.toString().toLowerCase()) &&
          statistic.avgCapacity <= 200
        ) {
          return (
            <tr key={statistic.refId}>
              <td>{statistic.refId}</td>
              <td>{statistic.registrationNumber}</td>
              <td>{statistic.capacity}</td>
              <td>{statistic.garbage}</td>
              <td>{statistic.avgCapacity}</td>
            </tr>
          );
        }
      } else {
        if (
          statistic[this.state.sortedValue]
            .toString()
            .toLowerCase()
            .includes(this.state.searchValue.toString().toLowerCase())
        ) {
          return (
            <tr key={statistic.refId}>
              <td>{statistic.refId}</td>
              <td>{statistic.registrationNumber}</td>
              <td>{statistic.capacity}</td>
              <td>{statistic.garbage}</td>
              <td>{statistic.avgCapacity}</td>
            </tr>
          );
        }
      }
    });

  searchValueChanged(e) {
    const { value } = e.currentTarget;
    this.setState({
      searchValue: value
    });
  }

  sortedValueChanged(e) {
    const { value } = e.currentTarget;

    this.setState({ sortedValue: value });
  }

  checkboxChange(e) {
    const { checked } = e.currentTarget;
    this.setState({ isAnomaly: checked });
  }

  render() {
    return (
      <div className="table-width margin-top">
        <div>
          <InputGroup>
            <Col md={6}>
              <Input onChange={this.searchValueChanged} />
            </Col>
            <Col md={3}>
              <Input
                type="select"
                value={this.state.sortedValue}
                onChange={this.sortedValueChanged}
              >
                <option value="refId">refId</option>
                <option value="registrationNumber">numer rejestracyjny</option>
                <option value="capacity">ładowność</option>
                <option value="garbage">rodzaj odpadów</option>
                <option value="avgCapacity">średnia łądowność</option>
              </Input>
            </Col>
            <Col md={3} className="center-flex">
              <Label check>
                <Input
                  type="checkbox"
                  onChange={this.checkboxChange}
                  checked={this.state.isAnomaly}
                />{' '}
                Pokaż anomalie
              </Label>
            </Col>
          </InputGroup>
        </div>
        <div>
          <Table striped className="margin-top">
            <thead>
              <tr>
                <th>refId</th>
                <th>numer rejestracyjny</th>
                <th>ładowność</th>
                <th>rodzaj odpadów</th>
                <th>średnia łądowność</th>
              </tr>
            </thead>
            <tbody>{this.displayStatistics()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
