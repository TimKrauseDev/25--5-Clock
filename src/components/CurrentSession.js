const CurrentSession = ({id, idTimer, idStartStop, idReset, title, sessionMinutes, sessionSeconds, startStop, reset, color}) => {
  return (
    <div className='currentSessionWrapper'>
      <h1 id={id}>{title}</h1>
      <p id={idTimer} style={color}>{sessionMinutes + ':' + sessionSeconds}</p>
      <button id={idStartStop} className='pointer' onClick={startStop}>Start/Stop</button>
      <button id={idReset} className='pointer' onClick={reset}>Reset</button>

    </div>
  )
}

export default CurrentSession
