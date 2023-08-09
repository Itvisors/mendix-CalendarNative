import React, { createElement, useState } from "react";

import { Calendar } from "../src/components/Calendar";
import { CalendarUtils } from "react-native-calendars";

export function CalendarNative(props) {
    const [selectedDateString, setSelectedDateString] = useState('');
    const executeOnDayPress = (date) => {
        setSelectedDateString(date.dateString);
        const dateObject = new Date(date.dateString);
        if (props.selectedDate) {
            if (!props.selectedDate.readOnly) {
                props.selectedDate.setValue(dateObject)
            }
        }
        //Execute the on day press action if needed
        if (props.onDayPress && props.onDayPress.canExecute) {
            props.onDayPress.execute();
        }
    }

    const viewDateString = props.viewDate && props.viewDate.value ? CalendarUtils.getCalendarDateString(props.viewDate.value) : undefined;

    if (props.datasourceEvents.status === "available") {
        return (
            <Calendar
                style={props.style}
                showWeekNumbers={props.showWeekNumbers}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                events={props.datasourceEvents}
                eventStartDate={props.eventStartDate}
                eventDotColor={props.eventDotColor}
                viewDate={viewDateString}
                onDayPress={executeOnDayPress}
                selectedDay={selectedDateString}
            />
        );
    } else {
        return <></>;
    }
}
