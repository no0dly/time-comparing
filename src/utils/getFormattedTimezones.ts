import { Timezone } from "../components/TownSelect";

interface TimezoneFromApi {
  zoneName: string;
  gmtOffset: number;
}

export const getFormattedTimezones = (zones: TimezoneFromApi[]): Timezone[] => {
  return zones?.map(
    (timezone) => {
      const { zoneName, gmtOffset } = timezone;

      return {
        value: JSON.stringify({ zoneName, gmtOffset }),
        label: zoneName.split("/")?.[1],
      };
    }
  )
}

export default getFormattedTimezones;