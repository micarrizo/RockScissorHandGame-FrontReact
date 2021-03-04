import React, { Fragment } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';
import Game from './components/Game';
import Edit from './components/Edit';
import EditMove from './components/EditMove';
import NewMove from './components/NewMove';
import NewGame from './components/NewGame';
import gameStats from './components/GameStats';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Menu} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/edit" component={Edit} />
              <Route exact path="/move/edit/:id" component={EditMove} />
              <Route exact path="/newMove" component={NewMove} />
              <Route exact path="/newGame" component={NewGame} />
              <Route exact path="/gamestats" component={gameStats} />
            </Switch>
          </div>
        </Fragment>
      </Provider>
    </Router>

  );
}

export default App;
