import { createElement } from "react";
import { Text } from "react-native";

export const renderArrows = (direction, customArrowStyles) => {
    let icon = ">";
    if (direction == "left") {
        icon = "<";
    }
    return <Text style={[customArrowStyles]}>{icon}</Text>;
};
