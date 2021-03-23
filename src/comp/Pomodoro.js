import React, { useState, useEffect } from 'react';
import './../scss/Pomodoro.scss';
import Canvas from './Canvas'



const Pomodoro = () => {

    let states = {
        short: { title: 'Short Break', min: 5 },
        pomodoro: { title: 'Pomodoro', min: 25 },
        long: { title: 'Long Break', min: 20 }
    }

    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(states.pomodoro.min);
    const [start, setStart] = useState(false);
    const [active, setActive] = useState(states.pomodoro)


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
        updateVars(active.min, 0, false);
    }

    const updateTimer = (state) => {
        setActive(state);
        updateVars(state.min, 0, true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        let target = event.target;

        Object.entries(states).forEach(state => {
            const [key, value] = state;
            if(key === target.name) {
                value.min = target.value
            }
        })

    }
    

    return (
        <>
            <div className="Pomodoro">
                <div className="Pomodoro--states">
                    {Object.values(states).map((state, i) => {
                        return (
                            <li className= {active.title === state.title ? "active" : ""} key={i}>{state.title}</li>
                        )
                    })
                    }
                </div>
                <div className="Pomodoro--wrap">
                    <Canvas active={active.min} min={min} />
                    <div className="Pomodoro--app">
                        <div className="Pomodoro--digit">{todDigits(min)}:{todDigits(sec)}</div>
                        <div className="Pomodoro--btn">


                        </div>
                        <div className="Pomodoro-gtn-wrap">

                            <button className="Pomodoro--btn" onClick={() => pauseTimer(start ? false : true)}>{
                                start ?
                                    <svg className="Pomodoro--btn-icon">
                                        <use xlinkHref="img/sprite.svg#icon-pause"></use>
                                    </svg>
                                    :
                                    <svg className="Pomodoro--btn-icon">
                                        <use xlinkHref="img/sprite.svg#icon-play"></use>
                                    </svg>
                            }</button>
                            <button onClick={() => stopTimer()} className="Pomodoro--btn">
                                <svg className="Pomodoro--btn-icon">
                                    <use xlinkHref="img/sprite.svg#icon-stop"></use>
                                </svg>
                            </button>
                        </div>



                    </div>
                </div>

                <div className="Pomodoro--options">
                    <button onClick={() => updateTimer(states.long)} className="Pomodoro--options-btn">Start Long Break</button>
                    <button onClick={() => updateTimer(states.pomodoro)} className="Pomodoro--options-btn">Pomodoro</button>
                    <button onClick={() => updateTimer(states.short)} className="Pomodoro--options-btn">Start Short Break</button>
                </div>
            <div className="Pomodoro--settings">
                <p className="Pomodoro--settings-title">Settings</p>
                <p className="Pomodoro--settings-head">Timer Minutes</p>
            </div>
            <form onSubmit={handleSubmit} className="Pomodoro--settingswrap" action="#">
                <div className="minwrap">
                    <label htmlFor="pomodoro">Pomodoro</label>
                    <input onChange={handleChange} type="number" name="pomodoro" id=""/>
                </div>
                <div className="minwrap">
                    <label htmlFor="">Long Break</label>
                    <input onChange={handleChange} type="number" name="long" id=""/>
                </div>
                <div className="minwrap">
                    <label htmlFor="short">Short Break</label>
                    <input onChange={handleChange} type="number" name="short" id=""/>
                </div>
            </form>

            </div>
        </>
    )
}

export default Pomodoro
