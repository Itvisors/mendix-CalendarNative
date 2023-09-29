import React, { createElement, useState, useEffect } from "react";

import { BasicCalendar } from "./components/BasicCalendar";
import { TimelineCalendar } from "./components/TimelineCalendar"
import { CalendarUtils } from "react-native-calendars";
import { setLocaleConfig } from "./utils/setLocaleConfig";
import { setViewDate } from "./utils/setViewDate";
import moment from 'moment';

export function CalendarNative(props) {
    const [selectedDateString, setSelectedDateString] = useState('');

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

    if (props.datasourceEvents.status === "available") {
        if (props.calendarView === "Timeline") {
            return (
                <TimelineCalendar
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
                    scrollToFirst={props.scrollToFirst}
                    scrollToCurrent={props.scrollToCurrent}
                    initialTime={props.initialTime}
                    startOfDay={props.startOfDay}
                    endOfDay={props.endOfDay}                    
                />
            );
        } else {
            return (
                <BasicCalendar
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
                />
            );
        }
    } else {
        return <></>;
    }
}
