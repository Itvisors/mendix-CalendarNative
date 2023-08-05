import { createElement, useState, useEffect } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar as CalendarLibrary } from "react-native-calendars";
import { multiDotMapping } from "../mappings/multidotMapping";

const defaultStyle = {
    container: {}
};

export function Calendar(props) {
    const [dots, setDots] = useState({});

    const styles = mergeNativeStyles(defaultStyle, props.style);

    useEffect(() => {
        props.events.items.map(item => {
            const dateDot = multiDotMapping(item, props.eventStartDate, props.eventDotColor);
            setDots(prevState => ({ ...prevState, ...dateDot }));
        });
    }, []);
    
    console.warn(dots);

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
                markedDates={dots}
            />
        </View>
    );
}