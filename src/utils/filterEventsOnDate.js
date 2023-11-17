import { and, attribute, dayGreaterThanOrEqual, dayLessThanOrEqual, literal, or } from "mendix/filters/builders";

//This function actually filters the datasourceEvents list retrieved by the DS, we could use this to retrieve only data of the month shown in the view
//USE FOR LAZY LOAD.
export function filterEventsOnDate(year, month, events, eventStartDate, eventEndDate) {
    // Calculate the first day of this month
    const firstDayOfPreviousMonth = new Date(year, month, 1);
    // Subtract 1 week (7 days) from the first day of this month
    const minDate = new Date(firstDayOfPreviousMonth);
    minDate.setDate(minDate.getDate() - 7);

    // Calculate the first day of the next month
    const firstDayOfNextMonth = new Date(year, month + 1, 1);
    // Add 1 week (7 days) to the first day of the next month
    const maxDate = new Date(firstDayOfNextMonth);
    maxDate.setDate(maxDate.getDate() + 7);

    let filterCond = and(
        dayGreaterThanOrEqual(attribute(eventStartDate.id), literal(minDate)),
        dayLessThanOrEqual(attribute(eventStartDate.id), literal(maxDate))
    );

    if (eventEndDate) {
        filterCond = or(
            and(
                dayLessThanOrEqual(attribute(eventStartDate.id), literal(maxDate)),
                dayGreaterThanOrEqual(attribute(eventEndDate.id), literal(minDate))
            ),
            filterCond
        );
    }

    events.setFilter(filterCond);
}
