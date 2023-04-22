import { useState } from 'react'

const useVisualMode = (visualMode) => {
  const [mode, setMode] = useState(visualMode);
  const [history, setHistory] = useState([visualMode])

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev]);
    } else {
      setMode(newMode);
      setHistory(oldHistory => [...oldHistory, newMode]);
    }
  }

  const back = () => {
    if (history.length === 1) {
      return
    }
    if (history.length !== 0) {
      history.pop();
      setMode(history[history.length -1])
    }
  }

  return {mode, transition, back};
}

export default useVisualMode;