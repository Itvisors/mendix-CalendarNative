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

export const CustomCalendarNativeTheme = {
    calendarBackground: '#f3b1b1',
    selectedDayBackgroundColor: '#06d7f8',
    todayTextColor: '#FFFFFF',
    todayBackgroundColor: '#bfd72f',
    selectedDayTextColor: '#bfd72f',
}
