import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {loadServicesAction} from '../actions/services.actions';
import {Header, Table, Icon, Menu, Grid, Input, Button, Dropdown, Checkbox} from 'semantic-ui-react';
import dotProp from 'dot-prop';
import moment from 'moment';
import styles from './App.css';

const dateFormat = 'MM/DD/YYYY hh:mmA';

export class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      search: '',
      searchBy: 'Search by Service',
      showOffline: false
    };
  }  

  componentDidMount () {
    this.props.loadServicesAction();
  }

  onRefreshButtonClick () {
    this.props.loadServicesAction();
  }

  onSearchChange({value}) {this.setState({search: value})}

  filterServices(services) {
    return this.state.searchBy === 'Search by Service' ?
      services.filter(service =>
        service.Spec.Name.includes(this.state.search)) :
      services.filter(service =>
        service.Spec.TaskTemplate.ContainerSpec.Image.includes(this.state.search))
  }

  filterOfflineServices() {
    return this.props.services.filter(service =>
      service.runningTasks === 0) 
  }

  render() {
    let services = this.state.showOffline ?
      this.filterOfflineServices():
      this.props.services;

    if(this.state.search !== '') {
      services = this.filterServices(services);
    }

    return (
    <div>
      <Menu className={styles.fixed} vertical floated>
        <Menu.Item header>Swarm den</Menu.Item>
        <Menu.Item name='Refresh' className="pointer" onClick={() => this.onRefreshButtonClick()} />
        <Dropdown text="Go to" item>
          <Dropdown.Menu >
            <Dropdown.Item onClick={() =>
               this.props.router.push('/nodes')}>Nodes</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text={this.state.searchBy} item>
          <Dropdown.Menu >
            <Dropdown.Item onClick={() =>
              this.setState({searchBy: 'Search by Service'})}>Service Name</Dropdown.Item>
            <Dropdown.Item onClick={() =>
              this.setState({searchBy: 'Search by Image'})}>Image Name</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <Input icon='search' onChange={(e, value) => this.onSearchChange(value)} placeholder='Search...' />
        </Menu.Item>
        <Menu.Item><Checkbox
          onChange={(e, {checked})=> this.setState({showOffline: checked})}
          className="checkbox" label='Offline Services'/>
        </Menu.Item>
      </Menu>
      <div className={styles.infoComponent}>
        <Table celled>
          <Table.Body>
            {filteredServices.map(service => 
            (<Table.Row key={dotProp.get(service, 'Spec.Name') || ''}>
              <Table.Cell
                className={styles.pointer}
                onClick={() => this.props.router.push(`/inspect/${dotProp.get(service, 'Spec.Name') || ''}`)}>
                {dotProp.get(service, 'Spec.Name') || ''}
              </Table.Cell>
              <Table.Cell
                positive={service.runningTasks >= 1}
                negative={!service.runningTasks}
              >{service.runningTasks >= 1 ? `Online: ${service.runningTasks}` : 'Offline'}
              </Table.Cell>
              <Table.Cell>
                <div>Created : {moment(service.CreatedAt).format(dateFormat)}</div>
                <div>Updated: {moment(service.UpdatedAt).format(dateFormat)}</div>
              </Table.Cell>
              <Table.Cell>{dotProp.get(service, 'Spec.TaskTemplate.ContainerSpec.Image') || ''}</Table.Cell>
            </Table.Row>))}
          </Table.Body>
        </Table>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    services: state.services.services
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    loadServicesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Services);