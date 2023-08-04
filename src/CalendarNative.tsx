import { ReactElement, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { CalendarNativeProps } from "../typings/CalendarNativeProps";

import { Calendar } from "../src/components/Calendar";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function CalendarNative({ style }: CalendarNativeProps<CustomStyle>): ReactElement {
    return <Calendar style={style}/>
}
