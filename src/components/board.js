import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Questions from './questions';
import AnswerForm from './answer-form';
import Feedback from './feedback';
import Progress from './progress';

import './board.css';

export function Board(props){
  if (!props.loggedIn) {
    return <Redirect to='/' />;
  }
  return(
    <div className="board-container">
      <div className="board">
        <div className="main-dash">
          <div className="quest">
            <Questions />
          </div>
          <div className="answ">
            <AnswerForm />
          </div>
        </div>
        <div className="dashboard-link" >
          <Link to="/dashboard"><i className="fas fa-home"></i> Back to Dashboard</Link>
        </div>
      </div>
      <Feedback />
      <Progress />
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Board);
