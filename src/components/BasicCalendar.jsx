import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar } from "react-native-calendars";
import { markingMapping } from "../mappings/markingMapping";

const defaultStyle = {
    container: {}
};

export function BasicCalendar(props) {
    const [markedDatesArray, setMarkedDatesArray] = useState({});

    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        const [eventsArray, markedDatesArrayT] = markingMapping(
            props.markingType,
            props.events.items,
            props.eventStartDate,
            props.eventEndDate,
            props.eventDotColor,
            props.eventText,
            props.selectedDay,
            props.singleMarkingColor,
            props.singleMarkingSelectedColor,
            props.singleMarkingSelectedTextColor
        );
        setMarkedDatesArray(markedDatesArrayT);
    }, [props.events.items, props.selectedDay, props.markingType]);

    return (
        <View style={styles.container}>
            <Calendar
                showWeekNumbers={props.showWeekNumbers}
                enableSwipeMonths
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                markingType={props.markingType}
                markedDates={markedDatesArray}
                initialDate={props.viewDate}
                onDayPress={props.onDayPress}
                onDayLongPress={props.onDayLongPress}
                firstDay={props.firstDay}
            />
        </View>
    );
}
