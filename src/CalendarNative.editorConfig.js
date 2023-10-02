import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";


export function getProperties(values, defaultProperties) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (values.calendarView === 'BasicCalendar') {
        hidePropertyIn(defaultProperties, values, "showTodayButton");
        hidePropertyIn(defaultProperties, values, "closeOnDayPress");
        hidePropertyIn(defaultProperties, values, "unavailableHours");
        hidePropertyIn(defaultProperties, values, "markingTypeTimeline");
        hidePropertyIn(defaultProperties, values, "scrollToFirst");
        hidePropertyIn(defaultProperties, values, "scrollToCurrent");
        hidePropertyIn(defaultProperties, values, "initialTime");
        hidePropertyIn(defaultProperties, values, "startOfDay");
        hidePropertyIn(defaultProperties, values, "endOfDay");
        hidePropertyIn(defaultProperties, values, "eventText");
        hidePropertyIn(defaultProperties, values, "onEventPress");
        hidePropertyIn(defaultProperties, values, "onBackgroundLongPress");
        hidePropertyIn(defaultProperties, values, "eventColor");
        hidePropertyIn(defaultProperties, values, "eventTextColor");
        
    } else {
        hidePropertyIn(defaultProperties, values, "markingTypeCalendar");
    }
    if (values.calendarView === 'Timeline' && values.markingTypeTimeline === 'single_dot'
        || values.calendarView === 'BasicCalendar' && values.markingTypeCalendar === 'single_dot') {
        hidePropertyIn(defaultProperties, values, "eventDotColor");
    } else {
        hidePropertyIn(defaultProperties, values, "singleMarkingColor"); 
        hidePropertyIn(defaultProperties, values, "singleMarkingSelectedColor");
        hidePropertyIn(defaultProperties, values, "singleMarkingSelectedTextColor");
    }
    return defaultProperties;
}