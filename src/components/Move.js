import React from 'react';
import {  useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { deleteMoveAction, getMoveEditAction } from '../actions/moveActions';

const Move = ({ Move }) => {
    const { _id, move, kills, img } = Move;
    const dispatch = useDispatch();
    const history = useHistory();

    const cormirmDeleteMove = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteMoveAction(id))
            }
        })

    }

    const redirectEditMove = move => {
        dispatch( getMoveEditAction(move) )
        history.push(`/move/edit/${move._id}`)
    }

    return (
        <tr>
            <td>{move}</td>
            <td>{kills}</td>
            <td><img alt="" className="move mx-auto" width="100" src={`http://localhost:4000/api/public/${img}`} /></td>
            <td><button type='button' onClick={() => redirectEditMove(Move)} className='btn btn-primary mr-2'>Edit</button></td>
            <td><button type="button" className="btn btn-danger" onClick={() => cormirmDeleteMove(_id)}>Delete</button></td>
        </tr>
    );
}

export default Move;