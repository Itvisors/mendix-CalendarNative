import { createElement } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import {Calendar as CalendarLibrary} from "react-native-calendars"

const defaultStyle = {
    container: {},
    label: {
        color: "#F6BB42"
    }
};

export function Calendar({ style }) {
    const styles = mergeNativeStyles(defaultStyle, style);
    return (
        <View style={styles.container}>
            <CalendarLibrary />
        </View>
    );
}
