import { createElement } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { Calendar as CalendarLibrary } from "react-native-calendars"

const defaultStyle = {
    container: {},
    label: {
        color: "#F6BB42"
    }
};

export function Calendar( props ) {
    const styles = mergeNativeStyles(defaultStyle, props.style);
    return (
        <View style={styles.container}>
            <CalendarLibrary
                showWeekNumbers={props.showWeekNumbers.value}
                showSixWeeks={props.showSixWeeks}
                enableSwipeMonths={props.enableSwipeMonths}
                hideDayNames={props.hideDayNames}
                hideArrows={props.hideArrows} />
        </View>
    );
}
