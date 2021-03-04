import {
    ADD_MOVE,
    ADD_MOVE_SUCCESS,
    ADD_MOVE_ERROR,
    DOWNLOAD_MOVES,
    DOWNLOAD_SUCCESS,
    DOWNLOAD_ERROR,
    DELETE_MOVE,
    DELETE_MOVE_SUCCESS,
    DELETE_MOVE_ERROR,
    EDIT_MOVE,
    EDIT_MOVE_SUCCESS,
    EDIT_MOVE_ERROR
} from '../types';

const initialState = {
    moves: [],
    loading: false,
    error: null,
    deletemove: null,
    editmove: null
}

export default function movesReducer(state = initialState, action){
    switch(action.type){
        case ADD_MOVE:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_MOVE_SUCCESS:
            return {
                ...state,
                loading: false,
                moves: [...state.moves.moves, action.payload]
                }
        case DOWNLOAD_ERROR:
        case ADD_MOVE_ERROR:
        case DELETE_MOVE_ERROR:
        case EDIT_MOVE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DOWNLOAD_MOVES:
            return {
                ...state,
                loading: action.payload
            }
        case DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                moves: action.payload
            }
        case DELETE_MOVE:
            return {
                ...state,
                deletemove: action.payload
            }
        case DELETE_MOVE_SUCCESS:
            return {
                ...state,
                moves: state.moves.moves.filter(move => move._id !== state.deletemove),
                deletemove: null,             
            }
        case EDIT_MOVE:
            return {
                ...state,
                editmove: action.payload
            }
        case EDIT_MOVE_SUCCESS:
            return {
                ...state,
                editmove: null,
                moves: state.moves.moves.map(move => move._id === action.payload._id ? move = action.payload : move)
            }
        default: 
            return state;
    }
}