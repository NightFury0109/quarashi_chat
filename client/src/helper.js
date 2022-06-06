export const difference2Parts = (milliseconds) => {
    const secs = Math.floor(Math.abs(milliseconds) / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const millisecs = Math.floor(Math.abs(milliseconds)) % 1000;
    const multiple = (term, n) => (n !== 1 ? `${n} ${term}s` : `1 ${term}`);

    return {
        days: days,
        hours: hours % 24,
        hoursTotal: hours,
        minutesTotal: mins,
        minutes: mins % 60,
        seconds: secs % 60,
        secondsTotal: secs,
        milliSeconds: millisecs,
        get diffStr() {
            return `${multiple(`day`, this.days)}, ${multiple(
                `hour`,
                this.hours
            )}, ${multiple(`minute`, this.minutes)} and ${multiple(
                `second`,
                this.seconds
            )}`;
        },
        get diffStrMs() {
            return `${this.diffStr.replace(` and`, `, `)} and ${multiple(
                `millisecond`,
                this.milliSeconds
            )}`;
        },
    };
};