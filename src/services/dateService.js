import moment from "moment";

// Function that returns if store is open receiving it's schedule
export function isOpen(schedule) {
    if (!getDayByNumber(schedule, getActualDay())) return false;

    const format = "hh:mm:ss";
    const { open: openTime, close: closeTime } = getDayByNumber(
        schedule,
        getActualDay()
    );

    const time = moment(),
        beforeTime = moment(`${openTime}:00`, format),
        afterTime = moment(`${closeTime}:00`, format);

    return time.isBetween(beforeTime, afterTime);
}

// Returns if category has at least one store opened
export function isCategoryOpen(stores) {
    let opened = false;
    stores.map(store => {
        if (!opened) opened = isOpen(store.schedule);
    });

    return opened;
}

// Get number of the current day of the week
export function getActualDay() {
    return moment().day();
}

export function getNextOpenTime(schedule) {
    let nextDay = false;
    let counter = 1;
    while (nextDay === false) {
        const probableDay = moment()
            .day(getActualDay() + counter)
            .day();
        if (!getDayByNumber(schedule, probableDay)) {
            counter++;
        } else {
            nextDay = probableDay;
        }
    }
    const dayName = moment()
        .day(nextDay)
        .format("dddd");
    return `Next opening time: ${dayName} at ${
        getDayByNumber(schedule, nextDay).open
    }hs`;
}

export function getDayByNumber(schedule, selectedDay) {
    return schedule.find(s => s.day === selectedDay);
}
