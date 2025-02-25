import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const HighlightCalendar = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const [date, setDate] = useState(startDate);

  // Function to add a CSS class based on date
  const tileClassName = ({ date }: { date: Date }) => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "highlighted";
    }
    return "";
  };
  

  return (
    <Box className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        minDate={startDate}
        maxDate={endDate}
      />
    </Box>
  );
};

export default HighlightCalendar;
