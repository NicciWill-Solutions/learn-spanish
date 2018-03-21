import React from 'react';
import { connect } from 'react-redux';

import './feedback.css';

export function Feedback(props){
    //{console.log(props)}
    if(props.view !== 'feedback'){
      return null;
    }
    else {
      if(props.correctAnswer.toLowerCase().trim() === props.userAnswer.toLowerCase().trim()){
        return(
          <div className="feedback">
            <h2 className="feedback-correct"><i className="fas fa-trophy"></i> Yes, that's correct!</h2>
          </div>
        )
      }
      else{
        return(
          <div className="feedback">
            <h2 className="feedback-wrong"><i className="far fa-times-circle"></i> Sorry, that's incorrect!</h2>
            <p className="feedback-correct-2">The correct answer was <span className="feedback-correct-highlight">"{props.correctAnswer}"</span></p>
          </div>
        )
      }
    }
}

const mapStateToProps = (state, props) => {
  return {
    correctAnswer: state.question.answer,
    view: state.response.view,
    userAnswer: state.response.response
  }
}

export default connect(mapStateToProps)(Feedback);