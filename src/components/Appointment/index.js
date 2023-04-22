import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.name} 
        />
      )} 
      {mode === CREATE && (
        <Form 
          interviewers={[]}
          onSave={() => console.log("Somebody you loved")}
          onCancel={() => back()}
        />
      )}
    </article>
  )
}

export default Appointment;