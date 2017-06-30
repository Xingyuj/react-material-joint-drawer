/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { systemInput } from '../actions/systemActions';
import Main from '../components/App';

injectTapEventPlugin();
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    return <Main {...this.props} />;
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {...state};
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { systemInput };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
