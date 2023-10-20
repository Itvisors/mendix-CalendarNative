import { createElement } from "react";
import { Text, TouchableOpacity } from "react-native";

export const renderArrows = (direction) => {
    const arrowStyles = {
        fontSize: 20
    };
    let icon = '>'
    if (direction == 'left') {
        icon = '<'
    }
    return (<TouchableOpacity style={{flex:1}} onPress={handleTextPress}>
        <Text
            style={[arrowStyles]}>
            {icon}
        </Text>
    </TouchableOpacity >)
}

const handleTextPress = (event) => {
    event.preventDefault(); // Prevent the default behavior of the touch event

    // Handle the press event here
    console.warn('Text pressed!');
  };