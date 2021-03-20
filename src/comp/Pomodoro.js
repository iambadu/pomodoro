import React, { useState, useEffect } from 'react';
import './../scss/Pomodoro.scss';
import Canvas from './Canvas'



const Pomodoro = () => {

    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(25)
    const [start, setStart] = useState(false)


    useEffect(() => {
        function timerInterval() {
            if (!start) return false;
            if (sec < 1) {
                if (min === 0) {
                    setStart(start => start = false);
                    return
                }
                setSec(sec => sec = 59)
                setMin(min => min - 1)
            } else setSec(sec => sec - 1);

        }
        const interval = setInterval(() => {
            timerInterval();
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [sec, min, start])

    function updateVars(min, sec, state) {
        setMin(min);
        setSec(sec);
        setStart(state);
    }

    const todDigits = (num) => num < 10 ? `0${parseInt(num, 10)}` : num;

    const pauseTimer = (bool) => {
        updateVars(min, sec, bool);
    }
    const stopTimer = () => {
        updateVars(25, 0, false);
    }

    let states = {
        short: 'Short Break',
        active: 'Pomodoro',
        long: 'Long Break'
    }

    return (
        <>
            <div className="Pomodoro">
                <div className="Pomodoro--states">
                    { Object.values(states).map((state) => {
                        return (
                            <li>{state}</li>
                        )
                    })
                    }
                </div>
                <div className="Pomodoro--wrap">
                    <Canvas min={min} />
                    <div className="Pomodoro--app">
                        <div className="Pomodoro--digit">{todDigits(min)}:{todDigits(sec)}</div>
                        <div className="Pomodoro--btn">
                          
                          
                        </div>
                      <div className="Pomodoro-gtn-wrap">

                        <button className="Pomodoro--btn" onClick={() =>  pauseTimer(start ? false : true)}>{
                        start ?  
                         <svg class="Pomodoro--btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-pause"></use>
                        </svg>
                        : 
                        <svg class="Pomodoro--btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-play"></use>
                        </svg>
                        }</button>
                        <button onClick={() => stopTimer()} className="Pomodoro--btn">
                        <svg class="Pomodoro--btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-stop"></use>
                        </svg>
                        </button>
                      </div>



                    </div>
                </div>

            </div>
        </>
    )
}

export default Pomodoro
