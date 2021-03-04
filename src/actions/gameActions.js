import Swal from 'sweetalert2';
import {
    BEGIN_GAME,
    BEGIN_GAME_SUCCESS,
    BEGIN_GAME_ERROR,
    INSERT_ROUNDS_START,
    INSERT_ROUNDS_SUCCESS,
    INSERT_ROUNDS_ERROR,
    END_GAME
} from '../types';
import axiosClient from '../config/axios';

//iniciar juego, guarda nombres y rounds
export function createNewGameAction(game){
    return async (dispatch) => {
        dispatch( addGame() );
        try {
            await axiosClient.post('/games', game)
            //.then(response => this.setState({_id : response.data.id}))
            .then(res => dispatch( addGameSuccess(res.data) ))

        } catch (error) {
            dispatch ( addGameError() );
        }
    }
}

const addGame = () => ({
    type: BEGIN_GAME,
    payload: true
});

const addGameSuccess = (game) => ({
    type: BEGIN_GAME_SUCCESS,
    payload: game
})

const addGameError = status => ({
    type: BEGIN_GAME_ERROR,
    payload: status
})

//guardar round en click en "go"
export function addRoundsAction(round){
    return async (dispatch) => {
        dispatch( addMatch() );
        const rounds = [round.round[0]];
        const ended_at = round.ended_at;
        const update = [];
        update.push({rounds: rounds, ended_at: ended_at, game_finished: 1})
        const winner = update[0].rounds[0].winner;
        const looser = update[0].rounds[0].looser;
        let counter = update[0].rounds[0].matches.length;
        try {
            const data = await axiosClient.put(`/games/${round.id}`, update[0])
            const winnerStats = await axiosClient.get(`/stats/player/${data.data.game._id}/matches-won/`, data.data)
            const mostUsedMoves = await axiosClient.get(`/stats/player/${data.data.game._id}/most-used-moves/`, data.data)
            const mostUsedMovesP1 = mostUsedMoves.data.gameMostUsedMove[0].move;
            await dispatch( insertRoundSuccess() )
            await Swal.fire({
                title: `<strong>Congrats!!!</strong>`,
                html:
                  `The EMPEROR is <b>${winner}</b> with the ${winnerStats.data.game[0].won_rate}% of matches won of <b>${counter}</b> matches.` +
                  '<br>'+
                  `And the Winner more used move is: <b>${mostUsedMovesP1}</b>` +
                  '<br>'+
                  '<br>'+
                  `The Looser is <b>${looser}</b>` ,
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: true,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Great!',
                //confirmButtonAriaLabel: 'Thumbs up, great!',
              })
        } catch (error) {
            dispatch( addRoundError() );
        }
    }
}

const addMatch = () => ({
    type: INSERT_ROUNDS_START
});

const insertRoundSuccess = () => ({
    type: INSERT_ROUNDS_SUCCESS
})

const addRoundError = () => ({
    type: INSERT_ROUNDS_ERROR,
    payload: true
})

export function gameEndAction(){
    return async (dispatch) => {
        dispatch( endGame() );
    }
}

const endGame = () => ({
    type: END_GAME
});
//cuando haya un ganador se guarda el juego completo en la base de datos


