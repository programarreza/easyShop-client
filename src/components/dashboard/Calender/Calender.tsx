import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Calendar.css";

// Cast DateRangePicker to any to avoid type issues
const DateRangePickerComponent = DateRangePicker as any;

const CalenderRange = ({ onDateChange }: { onDateChange: any }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    rangeColors: ["#F43F5E"],
  });

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
    onDateChange(ranges.selection);
  };

  return (
    <div className="border w-full flex justify-center items-center bg-[#F2F4F8]">
      <DateRangePickerComponent
        direction="vertical"
        minDate={new Date()}
        months={1}
        moveRangeOnFirstSelection={false}
        rangeColors={["#006ce1"]}
        ranges={[selectionRange]}
        showSelectionPreview={false}
        onChange={handleSelect}
      />
    </div>
  );
};

export default CalenderRange;
