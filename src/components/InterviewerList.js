import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"

const InterviewerList = (props) => {
  const interviewers = props.interviewers.map(int => <InterviewerListItem key={int.id} name={int.name} avatar={int.avatar} selected={int.id === props.value} setInterviewer={() => props.onChange(int.id)}/>)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;