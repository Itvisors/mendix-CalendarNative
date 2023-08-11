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
    container: {flex: 1}
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

    const INITIAL_TIME = { hour: 9, minutes: 0 };
    const timelineProps = {
        format24h: true,
        //onBackgroundLongPress: this.createNewEvent, // todo
        //onBackgroundLongPressOut: this.approveNewEvent, //todo
        unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }], // todo
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };

    return (
        //todo markings
        //todo event multiple days
        // showWeekNumbers={props.showWeekNumbers}
        // showSixWeeks={props.showSixWeeks}
        // enableSwipeMonths={props.enableSwipeMonths}
        // hideDayNames={props.hideDayNames}
        // hideArrows={props.hideArrows}
        // events={props.datasourceEvents}
        // eventStartDate={props.eventStartDate}
        // eventEndDate={props.eventEndDate}
        // eventText={props.eventText}
        // eventSummary={props.eventSummary}
        // eventDotColor={props.eventDotColor}
        // viewDate={viewDateString}
        // onDayPress={executeOnDayPress}
        // selectedDay={selectedDateString}
        // firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
        <View style={styles.container}>
            <CalendarProvider
                date={props.viewDate}
                //date={getDate()}
                showTodayButton // todo 
                disabledOpacity={0.6}
            //numberOfDays={3}
            >
                <ExpandableCalendar
                    firstDay={1} // todo
                    markedDates={markedDatesArray}
                />
                <TimelineList
                    events={eventsArray}
                    timelineProps={timelineProps}
                    showNowIndicator
                    scrollToNow  //todo prop
                    scrollToFirst // todo prop
                    initialTime={INITIAL_TIME}
                />
            </CalendarProvider>
        </View>
    );
}