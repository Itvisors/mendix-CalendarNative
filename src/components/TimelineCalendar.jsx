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
    container: {}
};

export function TimelineCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});
    const [eventsArray, setEventsArray] = useState({});


    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        let [eventsArrayT, markedDatesArrayT] = getTimelineEvents(props.events.items, props.eventStartDate, props.eventEndDate, props.eventText, props.eventSummary, props.selectedDay);
        setMarkedDatesArray(markedDatesArrayT);
        setEventsArray(eventsArrayT);
        console.warn('1');
    }, [setMarkedDatesArray, getTimelineEvents, props.events.items, props.selectedDay]);

    console.warn('2');
    console.warn(markedDatesArray);
    // console.warn({
    //     [`test`]: {marked: true},
    //     [`test2`]: {marked: true}
    //   });
    console.warn(eventsArray);
    console.warn('4');
    // useEffect(() => {
    //     setEventsArray(getMarkedDates(props.events.items, props.eventStartDate, props.eventEndDate));
    // }, [setEventsArray, getMarkedDates, props.events.items]);
    const INITIAL_TIME = { hour: 9, minutes: 0 };
    const timelineProps = {
        format24h: true,
        //onBackgroundLongPress: this.createNewEvent,
        //onBackgroundLongPressOut: this.approveNewEvent,
        // scrollToFirst: true,
        // start: 0,
        // end: 24,
        unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };

    return (
        //<View style={styles.container}>
        <CalendarProvider
            date={props.viewDate}
            //date={getDate()}
            showTodayButton
            disabledOpacity={0.6}
            numberOfDays={3}
        >
            <ExpandableCalendar
                firstDay={1}
                markedDates={markedDatesArray}
            />
            <TimelineList
                events={eventsArray}
                timelineProps={timelineProps}
                showNowIndicator
                // scrollToNow
                scrollToFirst
                initialTime={INITIAL_TIME}
            />
        </CalendarProvider>
        //</View>
    );
}