import React, { createElement, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { BasicCalendar } from "./components/BasicCalendar";
import { TimelineCalendar } from "./components/TimelineCalendar"
import { CalendarUtils } from "react-native-calendars";
import { setLocaleConfig } from "./utils/setLocaleConfig";
import { setViewDate } from "./utils/setViewDate";
import moment from 'moment';
import { filterEventsOnDate } from "./utils/filterEventsOnDate";

export function CalendarNative(props) {
    const [selectedDateString, setSelectedDateString] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let debounceTimeout;

    // Custom debounce function to handle arrow clicks
    const handleArrowClick = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    };

    const defaultStyle = {
        container: { flex: 1 }
    };
    const styles = mergeNativeStyles(defaultStyle, props.style);

    const onMonthChangeHandler = (date) => {
        setIsLoading(true);
        const year = date.year;
        const month = date.month - 1; //Months range from 0 till 11.

        filterEventsOnDate(year, month, props.datasourceEvents, props.eventStartDate, props.eventEndDate)

        //Set small timeout to make sure widget renders content
        setTimeout(() => {
            setIsLoading(false); // Set isLoading to false when data is loaded
        }, 1000);
    }

    //Set locale if changes
    useEffect(() => {
        if (props.locale && props.locale.value) {
            setLocaleConfig(props.locale.value);
        }
    }, [props.locale]);

    const executeOnDayPress = (date) => {
        setSelectedDateString(date.dateString);
        executeActionAndSetDate(date.dateString, props.onDayPress);
    }

    const executeOnDayLongPress = (date) => {
        setSelectedDateString(date.dateString);
        executeActionAndSetDate(date.dateString, props.onDayLongPress);
    }

    const executeOnBackgroundLongPress = (timeString, timeObject) => {
        executeActionAndSetDate(moment(timeString), props.onBackgroundLongPress);
    }

    const executeActionAndSetDate = (dateString, action) => {
        const dateObject = new Date(dateString);
        if (props.selectedDate) {
            if (!props.selectedDate.readOnly) {
                props.selectedDate.setValue(dateObject)
            }
            setViewDate(props.viewDate, dateObject);
        }
        //Execute the on day press action if needed
        if (action && action.canExecute) {
            action.execute();
        }
    }

    const onDateChanged = (date) => {
        setViewDate(props.viewDate, new Date(date));
    }

    const executeEventPress = (event) => {
        const datasourceItem = props.datasourceEvents.items[event.key];
        //Execute the on event action if needed
        if (props.onEventPress && props.onEventPress.get(datasourceItem).canExecute) {
            props.onEventPress.get(datasourceItem).execute();
        }
    }

    let markingType = props.calendarView === "Timeline" ? props.markingTypeTimeline : props.markingTypeCalendar;
    markingType = markingType.replace("_", "-");

    const viewDateString = props.viewDate && props.viewDate.value ? CalendarUtils.getCalendarDateString(props.viewDate.value) : CalendarUtils.getCalendarDateString(new Date());

    useEffect(() => {
        const date_obj = new Date(viewDateString);
        const year = date_obj.getFullYear();
        const month = date_obj.getMonth();
        filterEventsOnDate(year, month, props.datasourceEvents, props.eventStartDate, props.eventEndDate)
    }, [props.datasourceEvents.status])

    const getCalendar = () => {
        if (props.calendarView === "Timeline") {
            return <TimelineCalendar
                style={props.style}
                showWeekNumbers={props.showWeekNumbers}
                showTodayButton={props.showTodayButton}
                closeOnDayPress={props.closeOnDayPress}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                events={props.datasourceEvents}
                eventStartDate={props.eventStartDate}
                eventEndDate={props.eventEndDate}
                eventText={props.eventText}
                eventDotColor={props.eventDotColor}
                viewDate={viewDateString}
                onDayPress={props.onDayPress ? executeOnDayPress : undefined}
                onDayLongPress={props.onDayLongPress ? executeOnDayLongPress : undefined}
                onEventPress={props.onEventPress ? executeEventPress : undefined}
                onBackgroundLongPress={props.onBackgroundLongPress ? executeOnBackgroundLongPress : undefined}
                onDateChanged={onDateChanged}
                selectedDay={selectedDateString}
                firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                markingType={markingType}
                singleMarkingColor={props.singleMarkingColor}
                singleMarkingSelectedColor={props.singleMarkingSelectedColor}
                singleMarkingSelectedTextColor={props.singleMarkingSelectedTextColor}
                unavailableHours={props.unavailableHours}
                initialTime={props.initialTime}
                eventColor={props.eventColor}
                onMonthChangeHandler={onMonthChangeHandler}
                isLoading={isLoading}
                handleArrowClick={handleArrowClick}
            />
        } else {
            return <BasicCalendar
                style={props.style}
                showWeekNumbers={props.showWeekNumbers}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                events={props.datasourceEvents}
                eventStartDate={props.eventStartDate}
                eventEndDate={props.eventEndDate}
                eventText={props.eventText}
                eventDotColor={props.eventDotColor}
                viewDate={viewDateString}
                onDayPress={props.onDayPress ? executeOnDayPress : undefined}
                onDayLongPress={props.onDayLongPress ? executeOnDayLongPress : undefined}
                onDateChanged={onDateChanged}
                selectedDay={selectedDateString}
                firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                markingType={markingType}
                singleMarkingColor={props.singleMarkingColor}
                singleMarkingSelectedColor={props.singleMarkingSelectedColor}
                singleMarkingSelectedTextColor={props.singleMarkingSelectedTextColor}
                onMonthChangeHandler={onMonthChangeHandler}
                handleArrowClick={handleArrowClick}
            />
        }
    }

    if (props.datasourceEvents.status === "available") {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, zIndex: 1 }}>
                    {getCalendar()}
                </View>
                {isLoading && (<View
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>)}
            </View>
        );

    } else {
        return <></>;
    }
}
