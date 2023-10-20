import { createElement, useState, useEffect } from "react";

import { ExpandableCalendar, TimelineList, CalendarProvider } from "react-native-calendars";

import { markingMapping } from "../mappings/markingMapping";

import { theme } from "../utils/theme";
import { renderArrows } from "./Arrows";
import { getUnavailableHours } from "../utils/getUnavalableHours";


const defaultStyle = {
    container: { flex: 1 }
};

export function TimelineCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});
    const [eventsArray, setEventsArray] = useState({});
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        let [eventsArrayT, markedDatesArrayT] = markingMapping(
            props.markingType,
            props.events.items,
            props.eventStartDate,
            props.eventEndDate,
            props.eventDotColor,
            props.eventText,
            props.selectedDay,
            props.singleMarkingColor,
            props.singleMarkingSelectedColor,
            props.singleMarkingSelectedTextColor,
            props.eventColor
        );
        setEventsArray(eventsArrayT);
        setMarkedDatesArray(markedDatesArrayT);
    }, [props.events.items, props.selectedDay, props.markingType]);

    const timelineProps = {
        format24h: true,
        onEventPress: props.onEventPress,
        onBackgroundLongPress: props.onBackgroundLongPress,
        unavailableHours: getUnavailableHours(props.unavailableHours),
        unavailableHoursColor: theme.unavailableHoursColor,
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
        theme: theme,
    };

    const initialTime = (props.initialTime && props.initialTime.value) ? { hour: Number(props.initialTime.value), minutes: 0 } : undefined;

    return (
        <CalendarProvider date={props.viewDate}
            showTodayButton={props.showTodayButton}
            onDateChanged={props.onDateChanged}
            disabledOpacity={0.6}
            todayBottomMargin={20}
        >
            <ExpandableCalendar
                firstDay={props.firstDay}
                markedDates={markedDatesArray}
                markingType={props.markingType}
                closeOnDayPress={props.closeOnDayPress}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                onCalendarToggled={isOpen => setIsCalendarOpen(isOpen)}
                showWeekNumbers={props.showWeekNumbers && isCalendarOpen} // Week numbers only work when month is shown
                onDayPress={props.onDayPress}
                onDayLongPress={props.onDayLongPress}
                theme={theme}
                renderArrow={renderArrows}
                onMonthChange={date => props.onMonthChangeHandler(date)}
            />
            <TimelineList
                events={eventsArray}
                showNowIndicator
                timelineProps={timelineProps}
                initialTime={initialTime}
            />
        </CalendarProvider>
    );
}
