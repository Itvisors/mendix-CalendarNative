/**
 * This file was generated from CalendarNative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue, ListExpressionValue } from "mendix";

export interface CalendarNativeProps<Style> {
    name: string;
    style: Style[];
    datasourceEvents: ListValue;
    eventStartDate: ListAttributeValue<any>;
    eventEndDate?: ListAttributeValue<any>;
    eventText?: ListExpressionValue<string>;
    eventDotColor?: ListExpressionValue<string>;
}

export interface CalendarNativePreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    datasourceEvents: {} | { caption: string } | { type: string } | null;
    eventStartDate: string;
    eventEndDate: string;
    eventText: string;
    eventDotColor: string;
}
