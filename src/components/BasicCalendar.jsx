import { createElement, useState, useEffect } from "react";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { Calendar } from "react-native-calendars";
import { markingMapping } from "../mappings/markingMapping";
import { topLayerTheme, theme } from "../utils/theme";
import { renderArrows } from "./Arrows";

export function BasicCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});

    //Begin code merge styles
    const topLayerCustomStyles = {};
    for (const key in props.style[0]) {
        if (typeof props.style[0][key] !== 'object') {
            topLayerCustomStyles[key] = props.style[0][key];
            delete props.style[0][key];
        }
    }

    const themeMergedTopLayer = {...topLayerTheme, ...topLayerCustomStyles};
    const themeMergedUnderlyingLayer = mergeNativeStyles(theme, props.style);
    const themeMerged = {...themeMergedTopLayer, ...themeMergedUnderlyingLayer};
    const customArrowStyles = themeMerged.arrowStyles;
    //End code to merge styles

    useEffect(() => {
        const [, markedDatesArrayT] = markingMapping(
            props.markingType,
            props.events.items,
            props.eventStartDate,
            props.eventEndDate,
            props.eventDotColor,
            props.eventText,
            props.selectedDay,
            props.singleMarkingColor,
        );
        setMarkedDatesArray(markedDatesArrayT);
    }, [props.events.items, props.selectedDay, props.markingType]);

    return (
        <Calendar
            showWeekNumbers={props.showWeekNumbers}
            enableSwipeMonths
            hideArrows={props.hideArrows}
            markingType={props.markingType}
            markedDates={markedDatesArray}
            initialDate={props.viewDate}
            onDayPress={props.onDayPress}
            onDayLongPress={props.onDayLongPress}
            firstDay={props.firstDay}
            theme={themeMerged}
            renderArrow={direction => renderArrows(direction, customArrowStyles)}
            onDateChanged={props.onDateChanged}
            onMonthChange={props.onMonthChangeHandler}
            onPressArrowLeft={props.handleArrowClick}
            onPressArrowRight={props.handleArrowClick}
        />
    );
}
