import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar } from "react-native-calendars";
import { multiDotMapping } from "../mappings/multidotMapping";
import { multiPeriodMarking } from "../mappings/multiPeriodMarking";

const defaultStyle = {
    container: {}
};

export function BasicCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});

    const styles = mergeNativeStyles(defaultStyle, props.style);
   
    useEffect(() => {
        if (props.markingType === 'multi-dot') {
            setMarkedDatesArray(multiDotMapping(props.events.items, props.eventStartDate, props.eventDotColor, props.selectedDay));
        } else if (props.markingType === 'multi-period') {
            setMarkedDatesArray(multiPeriodMarking(props.events.items, props.eventStartDate, props.eventEndDate, props.eventDotColor, props.selectedDay));
        }   
    }, [props.events.items, props.selectedDay, props.markingType]);

    return (
        <View style={styles.container}>
            <Calendar
                showWeekNumbers={props.showWeekNumbers}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                markingType={props.markingType}
                markedDates={markedDatesArray}
                initialDate={props.viewDate}
                onDayPress={props.onDayPress}
                firstDay={props.firstDay}
            />
        </View>
    );
}