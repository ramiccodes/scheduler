import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Default state values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Function that takes in a day and changes the state value of day
  const setDay = (day) => setState({ ...state, day });

  // Takes in arguments that get put into an object that edits the database values using axios' PUT method and then changes the state locally
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const thisDay = state.days.find((day) => day.appointments.includes(id));

    const days = state.days.map((day) => {
      if (
        day.name === thisDay.name &&
        state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Takes in an id that sets the interview state as null inside an object that deletes the database values using axios' DELETE method and then deletes the state locally
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const thisDay = state.days.find((day) => day.appointments.includes(id));

    const days = state.days.map((day) => {
      if (day.name === thisDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Side effect that use Promise.all to make a GET request from these endpoints, which then sets the return values as state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
