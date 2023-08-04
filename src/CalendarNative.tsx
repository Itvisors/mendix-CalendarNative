import { ReactElement, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { HelloWorld } from "./components/HelloWorld";
import { CalendarNativeProps } from "../typings/CalendarNativeProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function CalendarNative({ style, yourName }: CalendarNativeProps<CustomStyle>): ReactElement {
    return <HelloWorld name={yourName} style={style} />;
}
