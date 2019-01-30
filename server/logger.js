const log = msg => {
    const now = new Date();
    const padLeft = value => value<10 ? "0"+value : value;

    console.log(`${padLeft(now.getHours())}:${padLeft(now.getMinutes())}:${padLeft(now.getSeconds())} ${msg}`);
}

module.exports = log;