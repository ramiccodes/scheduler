export default function getAppointmentsForDay(state, day) {
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