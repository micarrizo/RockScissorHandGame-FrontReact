import Swal from 'sweetalert2';
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
    EDIT_MOVE_ERROR,
    EDIT_MOVE_START

} from '../types';
import axiosClient from '../config/axios';

export function createNewMoveAction(move){
    return async (dispatch) => {
        dispatch( addMove() );

        try {
            await axiosClient.post('/moves', move);
            dispatch( addMoveSuccess(move) );

            Swal.fire(
                'Correct',
                'The Move has been added correctly',
                'success'
            )
            const response = await axiosClient.get('/moves');
            //console.log(response)
            
            dispatch(downloadMoveSuccess(response.data))
        } catch (error) {
            dispatch ( addMoveError() );

            Swal.fire({
                icon: 'error',
                title: 'Error',
                Text: 'Error, try again'
            })
        }

    }
}

const addMove = () => ({
    type: ADD_MOVE,
    payload: true
});

const addMoveSuccess = move => ({
    type: ADD_MOVE_SUCCESS,
    payload: move
});

const addMoveError = status => ({
    type: ADD_MOVE_ERROR,
    payload: status
})

export function downloadMovesAction(){
    return async (dispatch) => {
        dispatch( downloadMoves() );

        try {
            const response = await axiosClient.get('/moves');
            //console.log(response)
            
            dispatch(downloadMoveSuccess(response.data))
        } catch (error) {
            console.log(error)
            dispatch(downloadMoveError())
        }
    }
}

const downloadMoves = () => ({
    type: DOWNLOAD_MOVES,
    payload: true
})

const downloadMoveSuccess = (moves) => ({
    type: DOWNLOAD_SUCCESS,
    payload: moves
})

const downloadMoveError = () => ({
    type: DOWNLOAD_ERROR,
    payload: true
})

export function deleteMoveAction(id){
    return async (dispatch) => {
        dispatch(getMoveDelete(id) );

        try {
            
            await axiosClient.delete(`/moves/${id}`);
            dispatch( deleteMoveSuccess() )
            const response = await axiosClient.get('/moves');
            //console.log(response)
            dispatch(downloadMoveSuccess(response.data))
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } catch (error) {
            dispatch(deleteMoveError());
        }
    }
}

const getMoveDelete = id => ({
    type: DELETE_MOVE,
    payload: id
})

const deleteMoveSuccess = () => ({
    type: DELETE_MOVE_SUCCESS
})

const deleteMoveError = () => ({
    type: DELETE_MOVE_ERROR,
    payload: true
})

export function getMoveEditAction(move){
    return(dispatch) => {
        dispatch( getMoveAction(move) )
    }
}

const getMoveAction = move => ({
    type: EDIT_MOVE,
    payload: move
})

export function editMoveAction(move){
    return async(dispatch) => {
        dispatch( editMove() )
        try {
            await axiosClient.put(`/moves/${move._id}`, move);
            dispatch( editMoveSuccess(move) )

            const response = await axiosClient.get('/moves');
            //console.log(response)
            
            dispatch(downloadMoveSuccess(response.data))

        } catch (error) {
            dispatch( editMoveError() );
        }
    }
}

const editMove = () => ({
    type: EDIT_MOVE_START
})

const editMoveSuccess = move => ({
    type: EDIT_MOVE_SUCCESS,
    payload: move
})

const editMoveError = () => ({
    type: EDIT_MOVE_ERROR,
    payload: true
})