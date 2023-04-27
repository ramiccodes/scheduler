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
};

const getInterviewersForDay = (state, day) => {
  const arr = [];
  for (const item of state.days) {
    if (item.name === day) {
      for (const int of item.interviewers) {
        if (state.interviewers[int]) {
          arr.push(state.interviewers[int]);
        }
      }
    }
  }
  return arr;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
