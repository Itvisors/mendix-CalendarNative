## CalendarNative
Calendar widget specifically designed for native (mobile) applications. The user can view, create or edit events in a calendar or timeline view. 
Widget is based on https://wix.github.io/react-native-calendars/docs/Intro.


## Features
- View events in a calendar view or timeline view
- Interact with the calendar or timeline using
  - Single press on a day
  - Long press on a day or on the timeline
  - Swipe to right or left to go to the next month or week
  - Swipe up and down to expand or collapse the timeline
- Different marking types (i.e., dots or periods)
- Supports usage in multiple languages
- Week numbers
- Unavailable hours, periods in the timeline that disabled.
- Dark mode
- Styling options


## Usage
The widget needs a context object to be able to interact directly with the calendar (date to show attribute is always required). If you enable press events, you are obliged to use the Selected Date attributed with read/write access. This date will be filled with the date and time that has been pressed. You need to add a data source event to send the events to the calendar. You cannot use a scroll container surrounding the widget when you use the timeline view.


## Configuration
### General
- Data
  - Data source
  - Event Start Date
  - Event End Date
- Basic
  - Date to show: date where the calendar opens on. The widget will change this value when you change the date or create a new event, such that the widget will re-open on this date
  - View: either calendar or timeline
  - Locale: language that can be set to any moment locale to change the language according to https://momentjs.com/docs/#/i18n/changing-locale/ (e.g en (english) or nl(dutch))
- Timeline (properties only available for the timeline view)
  - Event Title: title to show in timeline

### Events
- General
  - On Day Press: action to trigger on day press. Selected Date property will be filled with the day pressed
  - On Day Long Press: action to trigger on day long press. Selected Date property will be filled with the day pressed
  - Selected Date: attribute where the date and time will be stored when an "on day press" or "on day long press" is triggered.

### Properties
- General
  - Show Week Numbers
  - Hide Arrows
  - Start of Week: either Monday or Sunday
- Timeline (properties only available for the timeline view)
  - Show Today Button
  - Close on select day: Minimize calendar when a day is selected
  - Initial Time: initial time where timeline loads
  - Unavailable Hours: list of hours that are disabled in the timeline
 
### Markings
- Marking Type: three options possible
  1. Single dot
  2. Multi-dot
  3. Multi-period (only possible in calendar view)
- Event Marking Color: should be a hex color (e.g., #00FF00)


## Styling options
The most common styling options are mentioned below:
1.	**calendarBackground (string):** The background color of the entire calendar component.
2.	**textSectionTitleColor (string):** The color of section titles, such as the month name and year.
4.	**selectedDayBackgroundColor (string):** The background color of the selected day.
5.	**selectedDayTextColor (string):** The text color of the selected day.
6.	**todayBackgroundColor (string):** The background color of today's date.
7.	**todayTextColor (string):** The text color of today's date.
8.	**dayTextColor (string):** The default text color for day cells.
9.	**textDisabledColor (string):** The text color for disabled day cells.
10.	**dotColor (string):** The color of dots below marked dates.
11.	**selectedDotColor (string):** The color of dots below the selected date.
12.	**disabledDotColor (string):** The color of dots below disabled dates.
13.	**monthTextColor (string):** The text color of the month title in the header.
14. **textDayFontFamily (string):** The font family for day cell text.
15. **textMonthFontFamily (string):** The font family for month title text.
16.	**textDayHeaderFontFamily (string):** The font family for day names in the header.
17.	**textMonthFontWeight (string):** The font weight for the month title text.
18.	**textDayFontSize (number):** The font size for day cell text.
19.	**textMonthFontSize (number):** The font size for month title text.
20.	**textDayHeaderFontSize (number):** The font size for day names in the header.
21. **arrowStyles {object}:** Object to define styling of the arrowButtons (e.g., fontSize, color).
23. **eventTitle {object}:** Object to define styling of the title of the events (e.g., color).
24. **eventSummary {object}:** Object to define styling of the event summary (e.g., font weight, color).

## Known limiation
- Period marking does not scale correctly in the timeline view, hence disabled. 
