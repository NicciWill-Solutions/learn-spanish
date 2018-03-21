import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import { Link } from 'react-router-dom';
import {resetState} from '../actions/auth';
import DonutChart from 'react-donut-chart';
import './dashboard.css';

export class Dashboard extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.props.dispatch(resetState(this.props.response, this.props.view, this.props.score, this.props.total))
    }

    startExercise(event){
        event.preventDefault();
        console.log('start exercise -- dispatch fetch questions');
    }

    getChartData(data){
        const chartData = data.map(item => {
            if(item.attempts === 0) {
                return {
                    value: 0,
                    label: item.word   
                }
            }
            else {
                return {
                    value: Math.round(item.correctCount/item.attempts*100), 
                    label: item.word
                }
            }
        })
        return chartData;
    }

    render() {
        // {console.log(this.props)};
        // {console.log(this.getChartData(this.props.protectedData))};
        return (
            <div className="dashboard">
                <h3 className="dashboard-username">
                    Welcome, {this.props.username}
                </h3>
                <p>Your Progess To-Date</p>
                <DonutChart 
                    className='chart-innertext'
                    formatValues={values => `${(values).toFixed(2)}%`}
                    data={
                        this.getChartData(this.props.protectedData)
                    }
                    colors={
                        [
                            '#00a8ff',
                            '#9c88ff',
                            '#fbc531',
                            '#4cd137',
                            '#487eb0',
                            '#e84118',
                            '#7f8fa6',
                            '#273c75',
                            '#fffff0',
                            '#e67e22'
                        ]
                    }
                />
                <div className="board-link">
                    <Link to="/board">Get Started!</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    //console.log(state);
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.username}`,
        protectedData: state.protectedData.data,
        response: state.response.response,
        view: state.response.view,
        score: state.response.numCorrect,
        total: state.response.totalQuest
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
