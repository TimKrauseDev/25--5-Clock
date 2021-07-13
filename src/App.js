import { useState, useEffect } from "react"; 
import TimerLength from "./components/TimerLength";
import CurrentSession from "./components/CurrentSession";
import alarm from "./components/alarm.mp3"

/**
 * For the countdown use: 
 * var countDownDate = new Date("15:37:25").getTime();
 * 
 * in a way to get the time like, 25 minutes from now. 
 * then you can use the differnce to display the session timer
 * 
 */

function App() {

  const [session, setSession] = useState({
    breakLength: 5,
    sessionLength: 25,
    minutes: null,
    seconds: null,
    color: {color: "black"},
    sessionTitle: "Session",
    player: null
  });
  
  const [didMount, setDidMount] = useState(false);
  const [runBool, setRunBool] = useState(false)
    
  //seting the initial session minutes and seconds
  useEffect(() => {
    setDidMount(true)
    const newState = {
      ...session,
      minutes: twoDigits(session.sessionLength),
      seconds: twoDigits(0)
    };
    setSession(newState);
  }, [])



  useEffect(() => {
    let interval;
    if (didMount && runBool) {
      interval = setInterval(() => {
        if (session.seconds === '00' && session.minutes !== '00') {
          const newState = {
            ...session,
            minutes: twoDigits(session.minutes - 1),
            seconds: twoDigits('59')
          };
          setSession(newState)
        } else if (session.minutes !== '00' || session.seconds !== '00') {
          const newState = {
            ...session,
            seconds: twoDigits(session.seconds - 1)
          };
          setSession(newState)
        } else {
          clearInterval(interval)
          if(session.color.color === "black" && session.breakLength !== '00') {
            const newState = {
              ...session,
              minutes: twoDigits(session.breakLength),
              seconds: twoDigits('0'),
              color: {color: "red"},
              sessionTitle: "Break"
            };
            setSession(newState)

          } else if (session.sessionLength !== '00') {
            const newState = {
              ...session,
              minutes: twoDigits(session.sessionLength),
              seconds: twoDigits('0'),
              color: {color: "black"},
              sessionTitle: "Session"
            };
            setSession(newState)
            
          }
        }
      }, 1000)
    }
    if (interval) {
      return () => clearInterval(interval)
    }
  })

  const twoDigits = (num) => {
    return (num < 10 ? '0' : '') + num;
  }
  
  
  const decrementBreak = () => { 
    if(session.breakLength > 1) { 
      const newState = {
        ...session,
        breakLength: session.breakLength - 1,
      };
      setSession(newState);
    } 
  }
   const incrementBreak = () => { 
    if(session.breakLength < 60) { 
      const newState = {
        ...session,
        breakLength: session.breakLength + 1
      };
      setSession(newState); 
    }  
   }
   const decrementSession = () => { 
    if(session.sessionLength > 1) { 
      const newState = {
        ...session,
        sessionLength: session.sessionLength - 1,
        minutes: twoDigits(session.sessionLength - 1)
      };
      setSession(newState);
    } 
   }
   const incrementSession = () => { 
    if(session.sessionLength < 60) { 
      const newState = {
        ...session,
        sessionLength: session.sessionLength + 1,
        minutes: twoDigits(session.sessionLength + 1)
      };
      setSession(newState);

    }  
   }
   

  const startStopFunction = () => {
    setRunBool((prevState) => !prevState);
     
  }


  const resetFunction = () => {  
    const newState = {
      ...session,
      breakLength: 5,
      sessionLength: 25,
      minutes: twoDigits('25'),
      seconds: twoDigits('0'),
      color: {color: "black"},
      sessionTitle: "Session"
    };
    setSession(newState);

    setRunBool(() => false)

  }
  
  
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className='length-setters'>
        <TimerLength 
          id='break-label' 
          idDec='break-decrement'
          idInc='break-increment'
          idLength='break-length'
          title='Break Length' 
          value = {session.breakLength}
          decrement = {decrementBreak}
          increment = {incrementBreak}
        />
        <TimerLength 
          id='session-label'
          idDec='session-decrement'
          idInc='session-increment' 
          idLength='session-length'
          title='Session Length' 
          value={session.sessionLength}
          decrement = {decrementSession}
          increment = {incrementSession}
        />
      </div>
      <CurrentSession
        id='timer-label'
        idTimer='time-left'
        idStartStop='start_stop'
        idReset='reset'
        title={session.sessionTitle}
        color={session.color}
        sessionMinutes={session.minutes}
        sessionSeconds={session.seconds}
        startStop = {startStopFunction}
        reset = {resetFunction}
      />
      <p class='credits'>Created By Tim Krause <br /> as part of the FCC course</p>
    </div>
  );
}

export default App;
