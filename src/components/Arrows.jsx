import { createElement } from "react";
import { Text } from "react-native";

export const renderArrows = (direction) => {
    const arrowStyles = {
        fontSize: 20
    };
    let icon = '>'
    if (direction == 'left') {
        icon = '<'
    } 
    return (<Text style={[arrowStyles]}>{icon}</Text>)
}