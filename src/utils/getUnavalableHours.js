export function getUnavailableHours(unavailableHours) {
    let newUnavailableHours = [];

    unavailableHours.forEach(unavailable => {
        let start = Number(unavailable.start.value);
        let end = Number(unavailable.end.value);
        if (end > 24) {
            end = 24;
        }
        if (start < 0) {
            start = 0;
        }
        if (end > start) {
            newUnavailableHours.push({ start: start, end: end });
        }
    });

    return newUnavailableHours;
}
