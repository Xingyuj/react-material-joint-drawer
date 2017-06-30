import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JointDrawer from './JointDrawer';

class AppComponent extends React.Component {

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
          show="both"
          status={this.props.system.status}
          rightChildren={rightChildren}
          leftChildren={leftChildren}
          statusManipulate={this.props.actions.systemInput}
        />
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;

AppComponent.propTypes = {
  actions: PropTypes.shape({systemInput: PropTypes.func}),
  system: PropTypes.shape({dashboardStatus: PropTypes.number}),
};
