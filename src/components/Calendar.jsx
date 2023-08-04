import { createElement } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar as CalendarLibrary, CalendarUtils } from "react-native-calendars";

const defaultStyle = {
    container: {},
};

export function Calendar(props) {
    const styles = mergeNativeStyles(defaultStyle, props.style);

    const INITIAL_DATE = Date();
    const date = CalendarUtils.getCalendarDateString(INITIAL_DATE);
         
      
    return (
        <View style={styles.container}>
            <CalendarLibrary
                showWeekNumbers={props.showWeekNumbers}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows}
                markingType={"multi-dot"}
                markedDates={{
                    [date]: {
                        selected: true,
                        dots: [
                            { key: "vacation", color: "blue", selectedDotColor: "red" },
                            { key: "massage", color: "red", selectedDotColor: "white" }
                        ]
                    }
                }}
            />
        </View>
    );
}