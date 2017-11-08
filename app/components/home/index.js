
import { connect } from 'react-redux';

import Home from './view';
import { default as reducer } from './reducer';

Home.reducer = reducer;

export { default as reducer } from './reducer';

export default connect(state => {
  return {
    state
  };
})(Home);
