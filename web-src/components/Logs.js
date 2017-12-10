import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {loadLogsAction,
  exportLogsAction,
  cleanLogsAction
} from '../actions/services.actions';
import {Form, Menu, Icon, Input, Checkbox, Dropdown} from 'semantic-ui-react';
import dotProp from 'dot-prop';
import moment from 'moment';
import styles from './App.css';
import download from 'in-browser-download';


const dateFormat = 'MM/DD/YYYY hh:mmA';

export class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamps: true,
      tail: 50,
      reverseOrder: false,
      search: '',
      exportType: 'all'
    };
  }  

  componentDidMount () {
    this.props.cleanLogsAction();
    this.props.loadLogsAction(this.props.params.service, this.state.tail, this.state.timestamps);
  }

  onRefreshButtonClick () {
    this.props.loadLogsAction(this.props.params.service, this.state.tail, this.state.timestamps);
  }

  onGoBackButtonClick () {
    this.props.router.push('/');
  }

  renderLogs () {
    return (
      <div className={styles.infoComponent}>
        {this.props.logs }
    </div>)
  }

  onTimestampCheckboxChange (checked) {
    this.props.loadLogsAction(this.props.params.service, this.state.tail, checked);
    this.setState({timestamps: checked})
  }

  onDownloadLogsClick () {
    if(this.props.exportLogs === ''){
      this.state.exportType === 'all' ? 
        this.props.exportLogsAction(this.props.params.service, 'all', this.state.timestamps) :
        this.props.exportLogsAction(this.props.params.service, this.state.tail, this.state.timestamps)
    }else {
      download(this.props.exportLogs, `${this.props.params.service}-${moment().format('MM-DD-YYThh-mm-ss')}.log`);
      this.props.cleanLogsAction();
    }
  }

  renderLogs () {
    let logs = this.state.reverseOrder ?
      [...this.props.logs].reverse() : this.props.logs;
    if (this.state.search !== '') {
      logs = logs.filter(log =>
        log.includes(this.state.search))
    }
    return logs.map((item, key) => (<div key={key}>{item}</div>));
  }

  render() {
    return (
    <div>
      <Menu className={styles.fixed} vertical floated>
        <Menu.Item header>Logs</Menu.Item>
        <Menu.Item name='Go back' onClick={() => this.onGoBackButtonClick()} />
        <Menu.Item name='Refresh' onClick={() => this.onRefreshButtonClick()} />
        <Menu.Item>
          <Checkbox
            checked={this.state.timestamps}
            onClick={(e, {checked})=> this.onTimestampCheckboxChange(checked)}
            className="checkesbox" label="Timestamps"
            />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            checked={this.state.reverseOrder}
            onClick={(e, {checked})=> this.setState({reverseOrder: checked})}
            className="checkesbox" label="Reverse Order"
            />
        </Menu.Item>
        <Menu.Item>
              <Input
                onChange={(e, {value})=> this.setState({tail: value})}
                value={this.state.tail}
                type="number" className={styles.menuInput}
                label={{ basic: true, content: 'last' }}
                labelPosition='right'
              />
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' onChange={(e, {value}) => this.setState({search: value})} placeholder='Search...' />
        </Menu.Item>
        <Menu.Item header>Download</Menu.Item>
        <Dropdown text={`Get ${this.state.exportType} logs`} item>
          <Dropdown.Menu >
            <Dropdown.Item onClick={() =>
              this.setState({exportType: 'all'})}>Get all logs</Dropdown.Item>
            <Dropdown.Item onClick={() =>
              this.setState({exportType: 'last'})}>Get last logs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {this.props.exportLogsLoading ?
          <Menu.Item >
            <div><Icon loading name='circle notched' /> Loading</div>
          </Menu.Item> :
          <Menu.Item className="pointer"
            onClick={() => this.onDownloadLogsClick()} >
            {this.props.exportLogs === '' ? 
              <div><Icon name='tasks' /> Load logs</div> :
              <div><Icon name='save' /> Download</div>
            }
          </Menu.Item>
        }
      </Menu>
      <div className={styles.infoComponent}>
        <div>
          {this.props.logs !== '' ? this.renderLogs() :
            'Logs not found'
          }
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    logs: state.services.logs,
    exportLogs: state.services.exportLogs,
    exportLogsLoading: state.services.exportLogsLoading
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    loadLogsAction,
    exportLogsAction,
    cleanLogsAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Service);