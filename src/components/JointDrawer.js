/* eslint-disable jsx-a11y/no-static-element-interactions,eqeqeq */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconRight from 'material-ui/svg-icons/image/navigate-next';
import IconLeft from 'material-ui/svg-icons/image/navigate-before';
import Radium from 'radium';
import color from 'color';
import {logger, undefNullNaNChecker} from './commonUtilities';

// noinspection JSUnresolvedFunction
const shiftControllerStyles = {
  right: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeft: '2px solid',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '21px',
    cursor: 'pointer',
    ':hover': {
      background: `linear-gradient(to right, ${color('#E8E8E8').darken(0.2).hex()} , #E8E8E8)`,
    },
    zIndex: '2',
  },
  left: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '19px',
    cursor: 'pointer',
    ':hover': {
      background: `linear-gradient(to left, ${color('#E8E8E8').darken(0.2).hex()} , #E8E8E8)`,
    }
  },
};

class JointDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: !this.props.show ? 'both' : this.props.show, // left/both/right
      // -1/0/1 : boundary at left edge/ middle/ right edge
      status: !this.props.status ? 0 : this.props.status,
    };
  }

  componentWillMount() {
    const {status} = this.state;
    this.setState({
      disableLeft: status === -1,
      disableRight: status === 1,
    });
    this.handleStatusChange = this.props.statusManipulator;
    logger('[JointDrawer] will mount status: ', status);
  }

  componentWillReceiveProps(nextProps) {
    if (undefNullNaNChecker(nextProps.status)) {
      logger('[JointDrawer] [will receive props] changing status to: ', nextProps.status);
      this.setState({
        // -1/0/1 : boundary at left edge/ middle/ right edge
        status: nextProps.status,
      }, () => logger('[JointDrawer] state changed: ', this.state));
    }
  }

  getStyles() {
    const muiTheme = this.context.muiTheme;
    const theme = muiTheme.drawer;
    const {status} = this.state;
    const styles = {};
    let rightTransform = null;
    let leftTransform = null;
    let rightWidth = '50%';
    let leftWidth = '50%';
    if (status === 1) {
      rightTransform = 'translate(95%, 0)';
      leftWidth = '100%';
    } else if (status === -1) {
      leftTransform = 'translate(-100%, 0)';
      rightWidth = '100%';
    }

    const rightStyles = {
      height: '95%',
      width: rightWidth,
      position: 'fixed',
      left: 'auto',
      right: 0,
      transform: rightTransform,
      transition: 'width 1s, transform 1s',
      backgroundColor: theme.color,
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
    };

    const leftStyles = {
      height: '95%',
      width: leftWidth,
      position: 'fixed',
      left: 0,
      transform: leftTransform,
      transition: 'width 1s, transform 1s',
      backgroundColor: theme.color,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
    };
    styles.rightStyles = rightStyles;
    styles.leftStyles = leftStyles;
    return styles;
  }

  handleShift(translateMultiplier) {
    const {status} = this.state;
    const disable = translateMultiplier > 0 ? 'Right' : 'Left';
    let result = 0;
    if (undefNullNaNChecker(status) && status !== translateMultiplier) {
      result = status + translateMultiplier;
      if (result === translateMultiplier) {
        this.setState({[`disable${disable}`]: true});
      }
    }
    this.setState({[`disable${disable}`]: false});
    // this.setState({status: result});
    this.handleStatusChange('status', result);
    logger('[JointDrawer] handle shift status to: ', result);
  }

  render() {
    const {
      leftChildren,
      rightChildren,
    } = this.props;
    const styles = this.getStyles();
    const {disableRight, disableLeft} = this.state;
    return (
      <div>
        <Paper
          style={Object.assign(styles.rightStyles)}
        >
          <div
            key={1}
            style={[shiftControllerStyles.right, disableRight && {':hover': {}}]}
            onClick={() => {
              if (!disableRight) {
                this.handleShift(1);
              }
            }}
          >
            <IconRight style={{width: '20px'}}/>
          </div>
          <div style={{height: '100%', overflow: 'auto'}}>
            {rightChildren}
          </div>
        </Paper>
        <Paper
          style={Object.assign(styles.leftStyles)}
        >
          <div style={{height: '100%', overflow: 'auto'}}>
            {leftChildren}
          </div>
          <div
            key={2}
            style={[shiftControllerStyles.left, disableLeft && {':hover': {}}]}
            onClick={() => {
              if (!disableLeft) {
                this.handleShift(-1);
              }
            }}
          >
            <IconLeft />
          </div>
        </Paper>
      </div>
    );
  }
}

JointDrawer.propTypes = {
  status: PropTypes.number,
  leftChildren: PropTypes.shape(),
  rightChildren: PropTypes.shape(),
  show: PropTypes.string,
  statusManipulator: PropTypes.func,
};


JointDrawer.defaultProps = {
  disableSwipeToOpen: false,
  docked: true,
  open: null,
  swipeAreaWidth: 30,
  width: null,
  zDepth: 2,
};

JointDrawer.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  theme: PropTypes.object,
};

export default Radium(JointDrawer);
