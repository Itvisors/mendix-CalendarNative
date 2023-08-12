import { attribute, literal, dayGreaterThanOrEqual, dayLessThanOrEqual, dayEquals, and, or } from "mendix/filters/builders";

//This function actually filters the datasourceEvents list retrieved by the DS, we could use this to retrieve only data of the month shown in the view
//USE FOR LAZY LOAD.
export function filterEventsOnDate(date, events, eventStartDate, eventEndDate) {
    const filterCond = or(
        dayEquals(attribute(eventStartDate.id), literal(date)),
        and(
            dayLessThanOrEqual(attribute(eventStartDate.id), literal(date)),
            dayGreaterThanOrEqual(attribute(eventEndDate.id), literal(date))
        )
    );
    
    events.setFilter(filterCond);
}