import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import {
    ExpandableCalendar,
    TimelineList,
    CalendarProvider
} from 'react-native-calendars';

import { getTimelineEvents } from "../mappings/getTimelineEvents";


const defaultStyle = {
    container: { flex: 1 }
};

export function TimelineCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});
    const [eventsArray, setEventsArray] = useState({});
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        let [eventsArrayT, markedDatesArrayT] = getTimelineEvents(props.events.items, props.eventStartDate, props.eventEndDate, props.eventText, props.eventSummary, props.selectedDay);
        setMarkedDatesArray(markedDatesArrayT);
        setEventsArray(eventsArrayT);
    }, [setMarkedDatesArray, getTimelineEvents, props.events.items, props.selectedDay]);

    const INITIAL_TIME = { hour: 9, minutes: 0 };
    const timelineProps = {
        format24h: true,
        //onBackgroundLongPress: this.createNewEvent, // todo
        //onBackgroundLongPressOut: this.approveNewEvent, //todo
        showWeekNumbers: props.showWeekNumbers ,
        unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }], // todo
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };

    return (
        //todo markings
        //todo event multiple days
        // onDayPress={executeOnDayPress}
        // onEventPress
        // renderEvent
        <View style={styles.container}>
            <CalendarProvider
                date={props.viewDate}
                showTodayButton // todo 
                disabledOpacity={0.6}
            >
                <ExpandableCalendar
                    firstDay={props.firstDay}
                    markedDates={markedDatesArray}
                    closeOnDayPress={false}
                    hideDayNames={props.hideDayNames}
                    hideArrows={props.hideArrows}
                    onCalendarToggled={(isOpen) => setIsCalendarOpen(isOpen)}
                    showWeekNumbers={props.showWeekNumbers && isCalendarOpen} // Week numbers only work when month is shown
                    onDayPress={props.onDayPress}
                />
                <TimelineList
                    events={eventsArray}
                    timelineProps={timelineProps}
                    showNowIndicator
                    scrollToNow
                    scrollToFirst
                    initialTime={INITIAL_TIME}
                />
            </CalendarProvider>
        </View>
    );
}