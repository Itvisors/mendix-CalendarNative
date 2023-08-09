import React, { createElement, useState } from "react";

import { Calendar } from "../src/components/Calendar";
import { CalendarUtils } from "react-native-calendars";

export function CalendarNative(props) {
    const [selected, setSelected] = useState('');
    const executeOnDayPress = (date) => {
        setSelected(date.dateString);
        //Execute the on day press action if needed
        // if (props.onShowAction && props.onShowAction.get(notification).canExecute) {
        //     props.onShowAction.get(notification).execute();
        // }
    }

    const viewDateString = CalendarUtils.getCalendarDateString(props.viewDate.value);

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
                selectedDay={selected}
            />
        );
    } else {
        return <></>;
    }
}
