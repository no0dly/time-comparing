import { FormValues } from "../App";


export const getSearchedTime = (values: FormValues): string | null => {
  const utcDate = new Date(
    Date.UTC(0, 0, 0, values.time.hour(), values.time.minute(), 0)
  );

  const searchedOffset = JSON.parse(values.searchedTimezone)?.gmtOffset;
  const currentOffset = JSON.parse(values.currentTimezone)?.gmtOffset;

  if ((searchedOffset || searchedOffset === 0) && (currentOffset || currentOffset === 0)) {
    const date =
      utcDate.getTime() + (searchedOffset * 1000 - currentOffset * 1000);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
      hourCycle: "h23"
    }).format(date);

    return formattedDate;
  } else {
    return null
  }
}

export default getSearchedTime;