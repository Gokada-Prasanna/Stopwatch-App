// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  renderTimeInMinutes = () => {
    const {timeElapsedInSeconds} = this.state

    const timeInMinutes = Math.floor(timeElapsedInSeconds / 60)

    if (timeInMinutes > 10) {
      return timeInMinutes
    }
    return `0${timeInMinutes}`
  }

  renderTimeInSeconds = () => {
    const {timeElapsedInSeconds} = this.state

    const timeInSeconds = Math.floor(timeElapsedInSeconds % 60)

    if (timeInSeconds < 10) {
      return `0${timeInSeconds}`
    }
    return timeInSeconds
  }

  onStartTimer = () => {
    this.intervalId = setInterval(this.updateTimer, 1000)
    this.setState({isTimerRunning: true})
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false, timeElapsedInSeconds: 0})
  }

  onStopTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false})
  }

  updateTimer = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderTimeInMinutes()}:${this.renderTimeInSeconds()}`

    return (
      <div className="bg-container">
        <div className="stopwatch-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatchTimer-container">
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="timer-image"
              />
              <p className="timerContainer-heading">Timer</p>
            </div>
            <h1 className="timer">{time}</h1>
            <div className="buttons-container">
              <button
                type="button"
                className="start-button button"
                onClick={this.onStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
