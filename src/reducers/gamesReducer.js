import {
    BEGIN_GAME,
    BEGIN_GAME_SUCCESS,
    BEGIN_GAME_ERROR,
    INSERT_ROUNDS_SUCCESS,
    INSERT_ROUNDS_ERROR,
    END_GAME
} from '../types';

const initialState = {
    initialGame: [],
    loading: false,
    error: null,
    editgame: null
}

export default function gamesReducer(state = initialState, action){
    switch(action.type){
        case BEGIN_GAME:
            return {
                ...state, 
                loading: action.payload
            }
        case BEGIN_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                initialGame: [action.payload]
            }
        case BEGIN_GAME_ERROR:
        case INSERT_ROUNDS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case INSERT_ROUNDS_SUCCESS:
        case END_GAME:
            return {
                ...state,
                initialGame: []
            }
        default: 
            return state;
    }
}