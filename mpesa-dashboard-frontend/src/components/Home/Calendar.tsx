import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "./calendar.css";

type Value = Date | Date[] | null;


const HighlightCalendar = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const [date, setDate] = useState<Date | null>(startDate);

  // Function to add a CSS class based on date
  const tileClassName = ({ date }: { date: Date }) => {
    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "highlighted";
    }
    return "";
  };

  const handleDateChange = (value: Value) => {
    if(value instanceof Date || value === null) {
      setDate(value)
    }
  }
  
  return (
    <Box className="calendar-container">
      <Calendar
        onChange={(value) => handleDateChange(value as Date | null)}
        value={date}
        tileClassName={tileClassName}
        minDate={startDate}
        maxDate={endDate}
      />
    </Box>
  );
};

export default HighlightCalendar;
