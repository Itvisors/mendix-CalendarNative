import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";


export function getProperties(values, defaultProperties) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (values.calendarView === 'Timeline') {
        hidePropertyIn(defaultProperties, values, "showTodayButton");
        hidePropertyIn(defaultProperties, values, "closeOnDayPress");
        hidePropertyIn(defaultProperties, values, "markingTypeCalendar");
    } else {
        hidePropertyIn(defaultProperties, values, "markingTypeTimeline");
    }
    if (values.markingType === 'single_dot') {
        hidePropertyIn(defaultProperties, values, "eventDotColor");
    } else {
        hidePropertyIn(defaultProperties, values, "singleMarkingColor");
        hidePropertyIn(defaultProperties, values, "singleMarkingSelectedColor");
        hidePropertyIn(defaultProperties, values, "singleMarkingSelectedTextColor");
    } 
    return defaultProperties;
}