import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import JointDrawer from './JointDrawer';
import {has, logger, undefNullNaNChecker} from './commonUtilities';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: 'both',
      status: !props.system.status ? 0 : props.system.status,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (has(nextProps, 'system.status')) {
      logger('[App] will receive props for status: ', nextProps.system.status);
      this.setState({
        // -1/0/1 : boundary at left edge/ middle/ right edge
        status: undefNullNaNChecker(nextProps.system.status) ?
          nextProps.system.status : 0,
      });
    }
  }

  render() {
    const rightChildren = (
      <div>
        <p>Right Section</p>
      </div>
    );

    const leftChildren = (
      <div>
        <div>
          <p>Left Section</p>
        </div>
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <JointDrawer
          show={this.state.show}
          status={this.state.status}
          rightChildren={rightChildren}
          leftChildren={leftChildren}
          statusManipulator={this.props.actions.systemInput}
        />
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;

AppComponent.propTypes = {
  actions: PropTypes.shape({systemInput: PropTypes.func}),
  system: PropTypes.shape({status: PropTypes.number}),
};
