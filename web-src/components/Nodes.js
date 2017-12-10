import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {loadNodesAction} from '../actions/services.actions';
import {Header, Table, Icon, Menu, Grid, Input, Button, Dropdown, Checkbox} from 'semantic-ui-react';
import dotProp from 'dot-prop';
import moment from 'moment';
import styles from './App.css';

const dateFormat = 'MM/DD/YYYY hh:mmA';

export class Nodes extends React.Component {
  componentDidMount () {
    this.props.loadNodesAction();
  }

  onRefreshButtonClick () {
    this.props.loadNodesAction();
  }

  onGoBackButtonClick () {
    this.props.router.push('/');
  }

  render() {
    const nodes = this.props.nodes;
    return (
    <div>
      <Menu className={styles.fixed} vertical floated>
        <Menu.Item header>Nodes</Menu.Item>
        <Menu.Item name='Go back' onClick={() => this.onGoBackButtonClick()} />
        <Menu.Item name='Refresh' onClick={() => this.onRefreshButtonClick()} />
      </Menu>
      <div className={styles.infoComponent}>
        <Table celled>
          <Table.Body>
            {nodes.map(node => 
            (<Table.Row key={node.ID || ''}>
              <Table.Cell>
                {dotProp.get(node, 'Description.Hostname') || ''}
              </Table.Cell>
              <Table.Cell>
                {dotProp.get(node, 'Spec.Availability') || ''}
              </Table.Cell>
              <Table.Cell>
                {`${dotProp.get(node, 'Spec.Role') || ''}${
                  dotProp.get(node, 'ManagerStatus.Leader') ? `(leader)` : '' 
                }`}
              </Table.Cell>
              <Table.Cell>
                <div>Created : {moment(node.CreatedAt).format(dateFormat)}</div>
                <div>Updated: {moment(node.UpdatedAt).format(dateFormat)}</div>
              </Table.Cell>
              <Table.Cell>
                Engine: {dotProp.get(node, 'Description.Engine.EngineVersion')}
              </Table.Cell>
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
    nodes: state.services.nodes
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    loadNodesAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);