import { createElement, useEffect, useState } from "react";

import { Calendar } from "react-native-calendars";
import { markingMapping } from "../mappings/markingMapping";
import { renderArrows } from "./Arrows";

export function BasicCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});

    useEffect(() => {
        const [, markedDatesArrayT] = markingMapping(
            props.markingType,
            props.events.items,
            props.eventStartDate,
            props.eventEndDate,
            props.eventDotColor,
            props.eventText,
            props.singleMarkingColor
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
            theme={props.theme}
            renderArrow={direction => renderArrows(direction, props.theme.arrowStyles)}
            onDateChanged={props.onDateChanged}
            onMonthChange={props.onMonthChangeHandler}
            onPressArrowLeft={props.handleArrowClick}
            onPressArrowRight={props.handleArrowClick}
        />
    );
}
