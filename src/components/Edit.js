import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { downloadMovesAction } from '../actions/moveActions';
import Move from '../components/Move';


const Edit = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const loadMoves = () => dispatch(downloadMovesAction());
        loadMoves();
    }, []);

    const moves = useSelector(state => state.moves.moves.moves);
    const error = useSelector(state => state.moves.error);

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1> <Link to={'/'} className='mb-3 btn-white fancy-text'> Back to menu </Link> </h1>
                    <div className="player animate__animated animate__bounce">

                        <div className="card-body">
                            <h2 className="text-center mt-4 mb-4 fancy-text text-white">Edit game moves</h2>
                            {error ? <p className="font-weight-bold alert alert-danger text-center mt-2">Error</p> : null}
                            <h1> <Link to={'/newMove'} className="mb-3 btn-white fancy-text">New move</Link> </h1>

                            <table className="table table-striped">
                                <thead className="bg-primary player">
                                    <tr>
                                        <th scope="col">Move</th>
                                        <th scope="col">Kills</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {typeof(moves) !== 'undefined' ? (
                                            moves.map(move => (
                                                <Move
                                                    key={move._id}
                                                    Move={move}
                                                />
                                            ))
                                        ) : 'No moves'
                                    }
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Edit;