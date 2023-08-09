import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar as CalendarLibrary } from "react-native-calendars";
import { multiDotMapping } from "../mappings/multidotMapping";

const defaultStyle = {
    container: {}
};

export function Calendar(props) {
    const [dotsArray, setDotsArray] = useState({});

    const styles = mergeNativeStyles(defaultStyle, props.style);
   
    useEffect(() => {
            setDotsArray(multiDotMapping(props.events.items, props.eventStartDate, props.eventDotColor, props.selectedDay));
    }, [setDotsArray, multiDotMapping, props.events.items, props.selectedDay]);

    // const INITIAL_DATE = Date();
    // const date = CalendarUtils.getCalendarDateString(INITIAL_DATE);

    return (
        <View style={styles.container}>
            <CalendarLibrary
                showWeekNumbers={props.showWeekNumbers}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                markingType={"multi-dot"}
                markedDates={dotsArray}
                initialDate={props.viewDate}
                onDayPress={props.onDayPress}
                firstDay={props.firstDay}
            />
        </View>
    );
}