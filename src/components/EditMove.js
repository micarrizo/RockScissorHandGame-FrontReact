import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editMoveAction } from '../actions/moveActions';
import ImgDrop from '../components/ImgDrop'

const EditMove = ({history}) => {

    const dispatch = useDispatch();
    const [Move, saveMove] = useState({
        move: '',
        kills: '',
        img: ''
    })
    const [image, saveImage] = useState('');

    const editmove = useSelector(state => state.moves.editmove);
    const moves = useSelector(state => state.moves.moves.moves);
    
    useEffect( () => {
        saveMove(editmove)
    }, [editmove]);

    const handleCallback = (imagePath) =>{
        //console.log(imagePath)
        saveImage(imagePath);
    }

    const onChangeForm = e => {
        saveMove({
            ...Move,
            [e.target.name] : e.target.value
        })
    }

    const { move, kills, img } = Move;



    const submitEditMove = e => {
        e.preventDefault();
        dispatch(editMoveAction(Move));
        history.push('/edit');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
            <h1> <Link to={'/edit'} className='mb-3 btn-white fancy-text'> Back to edit </Link> </h1>
                <div className="card player">
                    <div className="card-body">
                        <h2 className="text-center mb-2 font-weight-bold">Edit Move</h2>
                        <form onSubmit={ submitEditMove }>
                            <div className="form-group">
                                <label className="fancy-text">Move</label>
                                <input 
                                    type="text"
                                    className="form-control mb-3 btn-transparent fancy-text"
                                    placeholder="Move"
                                    name="move"
                                    value={move}
                                    onChange={onChangeForm}
                                />
                                <label className="fancy-text">Kills</label>
                                <select className="form-control  mb-3 btn-transparent fancy-text p-1 px-4" name="kills" value={kills} onChange={onChangeForm}>
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
                                >Save</button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
            
        </div>
        
     );
}

export default EditMove;