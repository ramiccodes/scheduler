function getAppointmentsForDay(state, day) {
  const arr = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const appt of item.appointments) {
        if (state.appointments[appt]) {
          arr.push(state.appointments[appt]);
        }
      }
    }
  }
  return arr;
}

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewObj = {};
  interviewObj["interviewer"] = state.interviewers[interview.interviewer];
  interviewObj["student"] = interview.student;
  return interviewObj;
}


export {getAppointmentsForDay, getInterview}


