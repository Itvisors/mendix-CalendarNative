import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { ExpandableCalendar, TimelineList, CalendarProvider } from 'react-native-calendars';

import { markingMapping } from "../mappings/markingMapping";


const defaultStyle = {
    container: { flex: 1 }
};

export function TimelineCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});
    const [eventsArray, setEventsArray] = useState({});
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        let [eventsArrayT, markedDatesArrayT] = markingMapping(props.markingType, props.events.items, props.eventStartDate, props.eventEndDate, props.eventDotColor, props.eventText, props.eventSummary, props.selectedDay);
        setEventsArray(eventsArrayT);
        setMarkedDatesArray(markedDatesArrayT)
    }, [props.events.items, props.selectedDay, props.markingType]);

    const timelineProps = {
        format24h: true,
        onEventPress: props.onEventPress,
        onBackgroundLongPress: props.onBackgroundLongPress,
        unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }], // todo
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,
    };

    return (
        <View style={styles.container}>
            <CalendarProvider
                date={props.viewDate}
                showTodayButton={props.showTodayButton}
                disabledOpacity={0.6}
            >
                <ExpandableCalendar
                    firstDay={props.firstDay}
                    markedDates={markedDatesArray}
                    markingType={props.markingType}
                    closeOnDayPress={props.closeOnDayPress}
                    hideDayNames={props.hideDayNames}
                    hideArrows={props.hideArrows}
                    onCalendarToggled={(isOpen) => setIsCalendarOpen(isOpen)}
                    showWeekNumbers={props.showWeekNumbers && isCalendarOpen} // Week numbers only work when month is shown
                    onDayPress={props.onDayPress}
                    onDayLongPress={props.onDayLongPress}
                />
                <TimelineList
                    events={eventsArray}
                    showNowIndicator
                    scrollToNow
                    scrollToFirst
                    timelineProps={timelineProps}
                    initialTime={{ hour: 9, minutes: 0 }} //todo
                />
            </CalendarProvider>
        </View>
    );
}