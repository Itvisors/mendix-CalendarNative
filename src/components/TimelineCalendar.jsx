import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import {
    ExpandableCalendar,
    TimelineList,
    CalendarProvider,
    CalendarUtils
} from 'react-native-calendars';

import { getMarkedDates } from "../mappings/getMarkedDates";
//import { getEvents } from "../mappings/getEvents";

const defaultStyle = {
    container: {}
};

export function TimelineCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});
    //const [eventsArray, setEventsArray] = useState({});

    const today = new Date();

    const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

    const marked = {
        [`${getDate(-1)}`]: {marked: true},
        [`${getDate()}`]: {marked: true},
        [`${getDate(1)}`]: {marked: true},
        [`${getDate(2)}`]: {marked: true},
        [`${getDate(4)}`]: {marked: true}
      };

    
    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        setMarkedDatesArray(getMarkedDates(props.events.items, props.eventStartDate, props.eventDotColor, props.selectedDay));
        console.warn('1');
    }, [setMarkedDatesArray, getMarkedDates, props.events.items, props.selectedDay]);

    console.warn(markedDatesArray);
    // useEffect(() => {
    //     setEventsArray(getMarkedDates(props.events.items, props.eventStartDate, props.eventEndDate));
    // }, [setEventsArray, getMarkedDates, props.events.items]);
    const INITIAL_TIME = {hour: 9, minutes: 0};
    const timelineProps = {
        format24h: true,
        //onBackgroundLongPress: this.createNewEvent,
        //onBackgroundLongPressOut: this.approveNewEvent,
        // scrollToFirst: true,
        // start: 0,
        // end: 24,
        unavailableHours: [{start: 0, end: 6}, {start: 22, end: 24}],
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
      };

    return (
        <View style={styles.container}>
            <CalendarProvider
                date={props.viewDate}
                showTodayButton
                disabledOpacity={0.6}
                // numberOfDays={3}
            >
                <ExpandableCalendar
                    firstDay={1}
                    markedDates={marked}
                />
                <TimelineList
                    events={markedDatesArray}
                    timelineProps={timelineProps}
                    showNowIndicator
                    // scrollToNow
                    scrollToFirst
                    initialTime={INITIAL_TIME}
                />
            </CalendarProvider>
        </View>
    );
}