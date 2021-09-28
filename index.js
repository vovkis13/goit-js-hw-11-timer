class CountdownTimer {
  refs = {
    daysRef: document.querySelector('.value[data-value="days"]'),
    hoursRef: document.querySelector('.value[data-value="hours"]'),
    minsRef: document.querySelector('.value[data-value="mins"]'),
    secsRef: document.querySelector('.value[data-value="secs"]'),
    timeRef: document.querySelector(this.selector),
  };

  ONE_SEC = 1000;
  counter = 0;

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  calcInterval() {
    if (this.targetDate > Date.now()) {
      return this.targetDate - Date.now();
    }
  }

  stopTimer(intervalId) {
    clearInterval(intervalId);
  }

  countValues(counter) {
    const days = Math.floor(counter / (1000 * 60 * 60 * 24));
    const hours = Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((counter % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }

  showValues(refs, { days, hours, mins, secs }) {
    refs.daysRef.textContent = String(days).padStart(2, 0);
    refs.hoursRef.textContent = String(hours).padStart(2, 0);
    refs.minsRef.textContent = String(mins).padStart(2, 0);
    refs.secsRef.textContent = String(secs).padStart(2, 0);
  }

  startTimer() {
    this.counter = this.calcInterval();
    let intervalId = setInterval(() => {
      const values = this.countValues(this.counter);
      this.showValues(this.refs, values);
      this.counter -= this.ONE_SEC;
      if (this.counter < this.ONE_SEC) this.stopTimer(intervalId);
    }, this.ONE_SEC);
  }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 1, 2021'),
});

countdownTimer.startTimer();
