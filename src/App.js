import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux-immutable';
import scroll from './reducer/scroll';
import * as actions from './actions/scroll';

import ScrollArea from './components/ScrollArea';
import ScrollTarget from './components/ScrollTarget';

const reducers = combineReducers({
  scroll,
});

let store = createStore(reducers);

const items = new Array(100).fill(1);

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header" style={{ background: "green" }}>
          <button onClick={() => store.dispatch(actions.setScrollTarget(`test${89}`))}>
            scroll to 89
          </button>
          <button onClick={() => store.dispatch(actions.setScrollTarget(`test${23}`))}>
            scroll to 23
          </button>
          <button onClick={() => store.dispatch(actions.startAutoScrollBottom())}>
            scroll to bottom
          </button>
          <button onClick={() => store.dispatch(actions.startAutoScrollTop())}>
            scroll to top
          </button>
        </div>
        <Provider store={store}>
            <ScrollArea>
            {
              items.map((data, index) => 
                <ScrollTarget key={index} name={`test${index}`}><p>test - index: {index}</p></ScrollTarget>
              )
            }
            </ScrollArea>
        </Provider>
      </div>
    );
  }
}

export default App;
