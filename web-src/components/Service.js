import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {loadServiceAction} from '../actions/services.actions';
import {Header, Table, Icon, Menu, Grid, Input, Button, Dropdown, Checkbox} from 'semantic-ui-react';
import dotProp from 'dot-prop';
import moment from 'moment';
import styles from './app.css';

const dateFormat = 'MM/DD/YYYY hh:mmA';

export class Service extends React.Component {
  componentDidMount () {
    this.props.loadServiceAction(this.props.params.service);
  }

  onRefreshButtonClick () {
    this.props.loadServiceAction(this.props.params.service);
  }

  onGoBackButtonClick () {
    this.props.router.push('/');
  }

  renderServiceInfo (service) {
    return (
      <div className={styles.infoComponent}>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Service name
            </Table.Cell>
            <Table.Cell>
              {dotProp.get(service, 'Spec.Name') || ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Image name
            </Table.Cell>
            <Table.Cell>
              {dotProp.get(service, 'Spec.TaskTemplate.ContainerSpec.Image') || ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            ID
            </Table.Cell>
            <Table.Cell>
              {service.ID || ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Mode
            </Table.Cell>
            <Table.Cell>
              {dotProp.get(service, 'Spec.EndpointSpec.Mode')|| ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Replicated
            </Table.Cell>
            <Table.Cell>
              {dotProp.get(service, 'Spec.Mode.Replicated.Replicas')|| ''}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Restart
            </Table.Cell>
            <Table.Cell>
              <div>Condition: {dotProp.get(service, 'Spec.TaskTemplate.RestartPolicy.Condition')|| ''}</div>
              <div>Max Attempts: {dotProp.get(service, 'Spec.TaskTemplate.RestartPolicy.MaxAttempts')|| 0}</div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Created
            </Table.Cell>
            <Table.Cell>
              {moment(service.CreatedAt).format(dateFormat)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Updated
            </Table.Cell>
            <Table.Cell>
              {moment(service.UpdatedAt).format(dateFormat)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h3>Environment Variables</h3>
      {dotProp.get(service, 'Spec.TaskTemplate.ContainerSpec.Env') ?
        dotProp.get(service, 'Spec.TaskTemplate.ContainerSpec.Env')
          .map((env, key) =>
            (<p key={key}>{env}</p>)):
        (<p>Not defined</p>)}    
    </div>)
  }

  render() {
    const service = this.props.service;
    return (
    <div>
      <Menu className={styles.fixed} vertical floated>
        <Menu.Item header>Inspect service</Menu.Item>
        <Menu.Item name='Go back' onClick={() => this.onGoBackButtonClick()} />
        <Menu.Item name='Refresh' onClick={() => this.onRefreshButtonClick()} />
      </Menu>
      {!service.CreatedAt ? (<h3 className={styles.infoComponent}>Not found</h3>): this.renderServiceInfo(service)}
    </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    service: state.services.service
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    loadServiceAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Service);