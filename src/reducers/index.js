import { combineReducers } from 'redux';
import movesReducer from './movesReducer';
import gamesReducer from './gamesReducer';

export default combineReducers({
    moves: movesReducer,
    games: gamesReducer
})