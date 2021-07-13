

const TimerLength = ({ id, idDec, idInc, idLength, title, value, decrement, increment }) => {
  return (
    <div className='timerLengthWrapper'>
      <h3 id={id}>{title}</h3>
      <div className='setTimer'>
        <div id={idDec} className='pointer' onClick={decrement}>&#8595;</div>
        <div id={idLength}>{value}</div>
        <div id={idInc} className='pointer' onClick={increment}>&#8593;</div>
      </div>
    </div>
  )
}

export default TimerLength
