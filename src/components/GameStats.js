
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Chart from "react-apexcharts";
import axiosClient from '../config/axios';

const GameStats = () => {

  const [comInc, setComInc] = useState({});
  const [averageQ, setaverageQ] = useState({});
  const [averageTime, setaverageTime] = useState(0);
  const [mostPickedMove, setmostPickedMove] = useState('');
  const [matrix, setMatrix] = useState({});

  useEffect(async () => {
    const mostPickedMove = await axiosClient.get('/stats/games/most-picked-move-first-game')
    const averageTime = await axiosClient.get('/stats/games/average-time');
    const averageQTakes = await axiosClient.get('/stats/matches/average-quantity-takes-to-complete');
    const percentageComInc = await axiosClient.get('/stats/matches/percentage-complete-incomplete');
    const matrixData = await axiosClient.get('/stats/matches/matrix');
    setaverageTime(averageTime.data.average_time_games_minutes)
    setaverageQ(averageQTakes.data)
    setmostPickedMove(mostPickedMove.data)
    //setMatrix(matrixData.data)
    setComInc({
      series: [percentageComInc.data.completed, percentageComInc.data.incompleted],
      options: {
        chart: {
          type: 'donut',
        },
        labels: ['Completed', 'Incompleted'],
        colors: ['#109648', '#F17300'],
        responsive: [{

          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    });


    setMatrix({
      series: matrixData.data,
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              ranges: [
                { from: 0, to: 4, color: '#FDE4D8', name: 'very low' },
                { from: 5, to: 10, color: '#F9AE8B', name: 'low' },
                { from: 11, to: 20, color: '#F5773D', name: 'medium' },
                { from: 21, to: 30, color: '#C2440A', name: 'high' },
                { from: 31, to: 40, color: '#612205', name: 'very high' }, 
              ]
            }
          }
        },
        title: {
          text: ''
        },
      }
    })
  }, []);

  return (
    <Fragment>
      <h1 className="mb-4 fancy-text text-white" >Game Stats</h1>
      <div className="row">
        {comInc.options &&
          <div id="chart" className="col-6" >
            <div className="player">
              <h4 className="mb-4 text-white" >Games Completed vs Incompleted</h4>
              <Chart options={comInc.options} series={comInc.series} type="donut" />
            </div>
          </div>
        }
        {averageQ && averageTime &&
          <div className="col-6">
            <div className="h-100 d-flex flex-column align-items-center justify-content-around">
              <div className="player w-100">
                <h4 className="text-white">Avg No games it takes a match to complete:</h4>
                <p className="text-white indicator">{averageQ.average_quantity}</p>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="player h-100">
                    <h4 className="text-white">Avg time of games:</h4>
                    <p className="text-white indicator">{Math.round(averageTime * 100) / 100}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="player h-100">
                    <h4 className="text-white">Most used move:</h4>
                    <img alt="" className="mx-auto" width="100" src={`http://localhost:4000/api/public/${mostPickedMove}`}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {matrix.options &&
          <div id="chart" className="col-12 mt-4">
            <div className="player h-100">
              <h4 className="mb-4 text-white" >Heat Map between moves</h4>
              <Chart options={matrix.options} series={matrix.series} type="heatmap" height={350} />
            </div>
          </div>
        }
      </div>
      <Link to={'/'} className='mt-5 btn-white fancy-text'> <i className="mdi mdi-arrow-left-bold-circle-outline"></i> Back to menu </Link>
    </Fragment>

  );
}

export default GameStats;