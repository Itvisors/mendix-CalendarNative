import { createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { Calendar } from "../src/components/Calendar";

export function CalendarNative({ style }) {
    return <Calendar style={style}/>
}
