function convertToLocalBangladeshTime(isoDate: string): string {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDate);
  let test;
  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka", // Time zone for Bangladesh
    hour12: false, // 24-hour format
  };

  // Convert to local time and format in Bangla
  const localDateString = date.toLocaleString("bn-BD", options);

  return localDateString;
}

export { convertToLocalBangladeshTime };
