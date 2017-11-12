import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dimmer, Loader} from 'semantic-ui-react'
import styles from './App.css';

export class App extends React.Component {

  render() {
    return (
      <div>
        <Dimmer className={styles.fixed} active={this.props.loading}>
          <Loader content='Loading' />
        </Dimmer>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.loading.isLoading
  };
};


const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);

