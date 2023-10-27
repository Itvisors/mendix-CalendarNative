import { brand } from "./custom-variables"

export const borderBottom = {
    container: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    }
}

export const Tile = {
    container: {
        width: '95%',
        paddingVertical: 20,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: brand.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    }
}

export const TileText = {
    text: {
        fontSize: 20,
        color: 'white',
    }
}


const aidenRoyalBlue = '#3C5279';
const aidenLimelightGreen = '#BFD730';
const aidenBlazeRed = '#D61F26';
const aidenCoolGrey = '#D3DAE1';
const aidenDisabledGrey = '#878c92'
const aidenOffWhite = '#F5F6F2';
const aidenWarmBlack = '#32363D';


export const CustomCalendarNativeTheme = {
    //Calendar
    calendarBackground: aidenWarmBlack,
    textSectionTitleColor: aidenLimelightGreen,
    dayTextColor : aidenOffWhite,
    textDisabledColor: aidenDisabledGrey, 
    monthTextColor: aidenLimelightGreen,
    
    //Selected day
    selectedDayBackgroundColor: aidenRoyalBlue,
    selectedDayTextColor: aidenLimelightGreen,
    
    //Today color
    todayTextColor: aidenBlazeRed,
    //todayBackgroundColor: aidenRoyalBlue

    //Fonts
    textDayFontFamily: 'Helvetica',
    textMonthFontFamily: 'Helvetica',
    textDayHeaderFontFamily: 'Helvetica',
    textMonthFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
    
    //Dots To-Do: Not working...
    dotColor: aidenLimelightGreen,
    selectedDotCoor: aidenCoolGrey,
    disabledDotColor: aidenBlazeRed,
    
    //To-Do: Link to Arrows.jsx
    arrowStyles: {
        color: aidenLimelightGreen
    }
}
