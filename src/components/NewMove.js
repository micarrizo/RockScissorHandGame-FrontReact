import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ImgDrop from '../components/ImgDrop'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import { createNewMoveAction } from '../actions/moveActions';


const NewMove = ({ history }) => {

    //component state
    const [move, saveMove] = useState('');
    const [kills, saveKills] = useState('');
    const [img, saveImage] = useState('');

    //dispatch to create a function
    const dispatch = useDispatch();

    //Action call
    const addMove = (move) => dispatch(createNewMoveAction(move));

    const handleCallback = (imagePath) => {
        //console.log(imagePath)
        saveImage(imagePath);

    }

    const moves = useSelector(state => state.moves.moves.moves);

    //function when press submit
    const submitNewMove = e => {
        e.preventDefault();
        //validate form
        if (move.trim() === '' || kills.trim() === '') {
            return;
        }
        //errors

        //create new move
        addMove({
            move,
            kills,
            img
        });

        history.push('/edit');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <h1> <Link to={'/edit'} className='mb-3 btn-white fancy-text'> Back to edit </Link> </h1>
                <div className="card player">
                    <div className="card-body">
                        <h2 className="text-center mb-2 font-weight-bold">New Move</h2>
                        <form
                            onSubmit={submitNewMove}
                        >
                            <div className="form-group">
                                <label className="fancy-text">Move</label>
                                <input
                                    type="text"
                                    className="form-control mb-3 btn-transparent fancy-text"
                                    placeholder="Name of your move.."
                                    name="move"
                                    value={move}
                                    onChange={e => saveMove(e.target.value)}
                                />
                                <label className="fancy-text">Kills</label>
                                <select className="form-control  mb-3 btn-transparent fancy-text p-1 px-4" value={kills} onChange={e => saveKills(e.target.value)}>
                                    <option value="0">Select a move to kill</option>
                                    {moves.map(move => <option value={move.move}>{move.move}</option>)}
                                </select>
                                <label className="fancy-text">image</label>
                                <ImgDrop
                                    type="file"
                                    name="img"
                                    placeholder="img"
                                    accept='image/*'
                                    getUploadParams={() => ({ url: 'rps/src/assets/img' })}
                                    onChange={handleCallback}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-1"
                                >Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default NewMove;