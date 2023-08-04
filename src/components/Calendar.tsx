import { ReactElement, createElement } from "react";
import { View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../CalendarNative";
import {Calendar as CalendarLibrary} from "react-native-calendars"
export interface CalendarProps {
    name?: string;
    style: CustomStyle[];
}

const defaultStyle: CustomStyle = {
    container: {},
    label: {
        color: "#F6BB42"
    }
};

export function Calendar({ style }: CalendarProps): ReactElement {
    const styles = mergeNativeStyles(defaultStyle, style);
    return (
        <View style={styles.container}>
            <CalendarLibrary />
        </View>
    );
}
