import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DateSelect({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate array of years (e.g., last 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  // Get current selected month and year from date prop
  const selectedMonth = date ? months[date.getMonth()] : null;
  const selectedYear = date ? date.getFullYear().toString() : null;

  const handleMonthChange = (newMonth: Date) => {
    // @ts-ignore
    const monthIndex = months.indexOf(newMonth);
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(monthIndex);
      setDate(newDate);
    } else {
      // If no date is set, create new date with selected month and current year
      setDate(new Date(currentYear, monthIndex));
    }
  };
  // @ts-ignore
  const handleYearChange = (newYear) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(parseInt(newYear));
      console.log(newDate);
      setDate(newDate);
    } else {
      // If no date is set, create new date with selected year and current month
      setDate(new Date(parseInt(newYear), new Date().getMonth()));
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="w-full">
        <Select
          value={selectedMonth || ""}
          // @ts-ignore
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Select value={selectedYear as string} onValueChange={handleYearChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
