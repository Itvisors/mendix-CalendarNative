import React, { createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

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
            />
        );
    } else {
        return <></>;
    }
}
