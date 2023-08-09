import React, { createElement } from "react";

import { Calendar } from "../src/components/Calendar";

export function CalendarNative(props) {
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
                viewDate={props.viewDate}
            />
        );
    } else {
        return <></>;
    }
}
