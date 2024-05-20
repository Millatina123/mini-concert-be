const convertTimeToDateTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return date;
};

const extractTimeFromDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toTimeString().split(" ")[0]; // Return time in HH:MM:SS format
};

const convertToISODate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return new Date(`${year}-${month}-${day}T00:00:00Z`);
};

const convertToDDMMYYYY = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

module.exports = { convertTimeToDateTime, extractTimeFromDateTime, convertToISODate, convertToDDMMYYYY };
