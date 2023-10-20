import { createElement, useState, useEffect } from "react";

import { Calendar } from "react-native-calendars";
import { markingMapping } from "../mappings/markingMapping";
import { theme } from "../utils/theme";
import { renderArrows } from "./Arrows";

export function BasicCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});


    useEffect(() => {
        const [eventsArray, markedDatesArrayT] = markingMapping(
            props.markingType,
            props.events.items,
            props.eventStartDate,
            props.eventEndDate,
            props.eventDotColor,
            props.eventText,
            props.selectedDay,
            props.singleMarkingColor,
            props.singleMarkingSelectedColor,
            props.singleMarkingSelectedTextColor
        );
        setMarkedDatesArray(markedDatesArrayT);
    }, [props.events.items, props.selectedDay, props.markingType]);

    return (
        <Calendar
            showWeekNumbers={props.showWeekNumbers}
            enableSwipeMonths
            hideDayNames={props.hideDayNames}
            hideArrows={props.hideArrows}
            markingType={props.markingType}
            markedDates={markedDatesArray}
            initialDate={props.viewDate}
            onDayPress={props.onDayPress}
            onDayLongPress={props.onDayLongPress}
            firstDay={props.firstDay}
            theme={theme}
            renderArrow={renderArrows}
            onDateChanged={props.onDateChanged}
            onMonthChange={props.onMonthChangeHandler}
        />
    );
}
