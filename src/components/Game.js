import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { downloadMovesAction } from '../actions/moveActions';
import { addRoundsAction,gameEndAction } from '../actions/gameActions';
import Swal from 'sweetalert2';

const Game = ({history}) => {

    //Matches
    const [move_player_one, saveMovePlayerone] = useState('');
    const [move_player_two, saveMovePlayerTwo] = useState('');
    
    //Rounds
    const [matches, saveMatches] = useState([]);
    //extra states
    const [roundsDone, saveRoundsDone] = useState(0);
    const [roundsWonPlayer1 , saveroundsWonPlayer1] = useState(0)
    const [roundsWonPlayer2 , saveroundsWonPlayer2] = useState(0)
    /**************************************************************/
    //Show Moves
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMoves = () => dispatch(downloadMovesAction());
        loadMoves();
    }, []);

    const moves = useSelector(state => state.moves.moves.moves);
    /**************************************************************/
    //movimientos
    //var match = []
    const selectedPlayer1 = (move) => {
        saveMovePlayerone(move)
    }

    const selectedPlayer2 = (move) => {
        saveMovePlayerTwo(move)
    }

    //SAVE Rounds
    const addRounds = (match) => dispatch(addRoundsAction(match));

    //function when press submit
    const addMatchSubmit = e => {
        e.preventDefault();
        saveRoundsDone(roundsDone+1)
        const getKilledByMove1 = moves.filter(x => x.move === move_player_one)
        const getKilledByMove2 = moves.filter(x => x.move === move_player_two)
        if (getKilledByMove1[0].kills === move_player_two) {
            saveroundsWonPlayer1(roundsWonPlayer1+1);
            let match = { move_player_one: move_player_one, move_player_two: move_player_two, winner: state.player_one }
            saveMatches(arr => [...arr, match]);
            if(roundsWonPlayer1+1 !== state.n_rounds){
                Swal.fire({
                    title: `Winner is....${state.player_one}`,
                    icon: 'success',
                    confirmButtonText: 'Next Round'
                })
            }
        } else if (getKilledByMove2[0].kills === move_player_one) {
            saveroundsWonPlayer2(roundsWonPlayer2+1);
            let match = { move_player_one: move_player_one, move_player_two: move_player_two, winner: state.player_two }
            saveMatches(arr => [...arr, match]);
            console.log('wons by player 2: ')
            console.log(roundsWonPlayer2+1);
            if(roundsWonPlayer2+1 !== state.n_rounds){
                Swal.fire({
                    title: `Winner is....${state.player_two}`,
                    icon: 'success',
                    confirmButtonText: 'Next Round'
                })
            }
        } else {
            let match = { move_player_one: move_player_one, move_player_two: move_player_two, winner: 'Draw' }
            saveMatches(arr => [...arr, match]);
            Swal.fire({
                title: `Draw`,
                icon: 'success',
                confirmButtonText: 'Next Round'
            })
        }
        saveMovePlayerone('')
        saveMovePlayerTwo('')
    }
   
    //when ends game submit the entire game to node and redirect to menu
    const matchEndGame =  (matches) => {
        //Save Game
        const round = [];
        const winner = (roundsWonPlayer1>roundsWonPlayer2) ? state.player_one : state.player_two;
        const looser = (roundsWonPlayer1<roundsWonPlayer2) ? state.player_one : state.player_two;
        round.push({ matches: matches, winner: winner, looser: looser})
        const id = state._id
        const ended_at = new Date();
        // put round on dispatch
        addRounds({
            round,
            id,
            ended_at
        });
        history.push('/');
    }
    const loading = useSelector(state => state.games.loading);
    const state = useSelector(state => state.games.initialGame[0])

    //Iteration on rounds and rounds won On player 1
    const roundPlayer1 = n_rounds => {
        let n = [];
        for (let i = 0; i < n_rounds; i++) {
            n.push(<div className={(roundsWonPlayer1 > i) ? `round won round_p1_${i}` : `round round_p1_${i}`}></div>)
        }
        return n;
    }
    //Iteration on rounds and rounds won On player 2
    const roundPlayer2 = n_rounds => {
        let n = [];
        for (let i = 0; i < n_rounds; i++) {

            n.push(<div className={(roundsWonPlayer2 > i) ? `round won round_p2_${i}` : `round round_p2_${i}`}></div>)
        }
        return n;
    }
    
    //Dispatch to endGame when press "Back to Menu"
    const gameEnd = () => dispatch(gameEndAction())
    

    return (
        (loading === false) ?
        
            <div className="row" >
                {/* Player 1 */}
                {(roundsWonPlayer1 === state.n_rounds || roundsWonPlayer2 === state.n_rounds) ? matchEndGame(matches) : ''}
                <div className="col-5 p-4">
                    <div className="player animate__animated animate__bounce">
                        <h2 className="mb-4 fancy-text text-white">Player 1: {state.player_one}</h2>
                        <div className="row mb-4">
                            <div className="col-3">
                                <h4 className="text-lg text-center text-white"><i className="mdi mdi-trophy"></i> { }</h4>
                                <h4 className="text-md text-center text-white">Won moves!</h4>
                            </div>
                            <div className={(state.n_rounds <= 4) ? "col-4" : `col-${state.n_rounds}`}>
                                <div className="rounds mb-3">
                                    {roundPlayer1(state.n_rounds)}
                                </div>
                                <h4 className="text-md text-center text-white">Rounds Actuales</h4>
                            </div>
                        </div>
                        {!move_player_one ? (
                            <div>
                                <h4 className="mb-3 fancy-text text-white">Chose your move!</h4>
                                <div className="moves">
                                    {typeof (moves) !== 'undefined' ? (
                                        moves.map(move =>
                                        (
                                            <div className="move"
                                                key={move._id}
                                                onClick={e => selectedPlayer1(move.move)}>
                                                <img className="" alt="" src={`http://localhost:4000/api/public/${move.img}`}></img>
                                            </div>
                                        )
                                        )
                                    ) : 'No moves'
                                    }
                                </div>
                            </div>
                        ) : ''}

                    </div>
                </div>

                <div className="col-2 d-flex flex-column align-items-center justify-content-center">
                    <h2 className="text-center text-white fancy-text mb-5">Round 1{ }</h2>
                    <a 
                        className={!move_player_two && !move_player_two ? 'btn btn-success btn-lg disabled' : 'btn btn-success btn-lg'}
                        onClick={addMatchSubmit}
                    >Go!</a>
                </div>

                {/* Player 2 */}
                <div className="col-5 p-4">
                    <div className="player animate__animated animate__bounce">
                        <h2 className="mb-4 text-end fancy-text text-white">Player 2: {state.player_two}</h2>
                        <div className="row mb-4 justify-content-end">

                            <div className={(state.n_rounds <= 4) ? "col-4" : `col-${state.n_rounds}`}>
                                <div className="rounds mb-3 flex-reverse">
                                    {roundPlayer2(state.n_rounds)}
                                </div>
                                <h4 className="text-md text-center text-white">Rounds Actuales</h4>
                            </div>
                            <div className="col-3">
                                <h4 className="text-lg text-center text-white"><i className="mdi mdi-trophy"></i> { }</h4>
                                <h4 className="text-md text-center text-white">Won moves!</h4>
                            </div>
                        </div>
                        {!move_player_two ? (
                            <div>
                                <h4 className="mb-3 fancy-text text-white"> Chose your move!</h4>
                                <div className="moves flex-reverse">
                                    {typeof (moves) !== 'undefined' ? (
                                        moves.map(move =>
                                        (
                                            <div className="move"
                                                key={move._id}
                                                onClick={e => selectedPlayer2(move.move)}>
                                                <img className="" alt="" src={`http://localhost:4000/api/public/${move.img}`}></img>
                                            </div>
                                        )
                                        )
                                    ) : 'No moves'
                                    }
                                </div>
                            </div>
                        ) : ''}

                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link to={'/'} onClick={gameEnd} className='btn-white fancy-text'> <i className="mdi mdi-arrow-left-bold-circle-outline"></i> Back to menu </Link>
                </div>

            </div >
            : null
    );
}

export default Game;