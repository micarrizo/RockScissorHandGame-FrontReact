
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Slider from 'react-input-slider';

import { createNewGameAction } from '../actions/gameActions';


const NewGame = ({ history }) => {
    //component state
    const [player_one, savePlayer1] = useState('');
    const [player_two, savePlayer2] = useState('');
    const [rounds] = useState([]);
    const [slider, setSlider] = useState({ x: 3 });

    //dispatch to create a function
    const dispatch = useDispatch();

    //access to store's state
    // const loading = useSelector(state => state.moves.loading);
    // const error = useSelector(state => state.moves.error)

    //Action call
    const addGame = game => {
        dispatch(createNewGameAction(game));

    }

    //function when press submit
    const submitNewGame = e => {
        e.preventDefault();
        const n_rounds = slider.x
        const game_finished = 0;
        
        //validate form
        // if (player1.trim() === '' || player2.trim() === '' || rounds < 1) {
        //     return;
        // }
        //errors

        //create new move
        addGame({
            player_one,
            player_two,
            rounds,
            n_rounds,
            game_finished
        });

        history.push('/game');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <h1> <Link to={'/'} className='mb-3 btn-white fancy-text'> Back to Menu </Link> </h1>
                <div className="card player">
                    <div className="card-body">
                        <h2 className="text-center mb-2 fancy-text font-weight-bold">New Move</h2>
                        <form
                            onSubmit={submitNewGame}
                        >
                            <div className="form-group">
                                <label className="fancy-text">Player 1 Name</label>
                                <input
                                    type="text"
                                    className="form-control mb-3 btn-transparent fancy-text"
                                    placeholder="Text your name here..."
                                    name="player1"
                                    value={player_one}
                                    onChange={e => savePlayer1(e.target.value)}
                                />
                                <label className="fancy-text">Player 2</label>
                                <input
                                    type="text"
                                    className="form-control mb-3 btn-transparent fancy-text"
                                    placeholder="Text your name here..."
                                    name="player2"
                                    value={player_two}
                                    onChange={e => savePlayer2(e.target.value)}
                                />
                                <label className="fancy-text">Rounds</label>
                                <div className="mb-2">
                                <Slider 
                                    axis="x" 
                                    xstep={1}
                                    xmin={1}
                                    xmax={8}
                                    x={slider.x} 
                                    onChange={setSlider} 
                                    styles={{
                                        track: {
                                          backgroundColor: 'rgba( 31, 38, 135, 0.37 )'
                                        },
                                        active: {
                                          backgroundColor: '#00d3ff'
                                        },
                                        thumb: {
                                          width: 25,
                                          height: 25,
                                          opacity: 0.8
                                        }
                                    }}                            
                                />
                                </div>
                                <input
                                    type="number"
                                    className="form-control mb-3 btn-transparent fancy-text"
                                    name="rounds"
                                    value={slider.x}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary fancy-text font-weight-bold text-uppercase d-block w-100 mt-1"
                                >Start</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default NewGame;