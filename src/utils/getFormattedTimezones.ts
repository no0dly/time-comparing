import { Timezone } from "../api";

export interface TimezoneForSelect {
  value: string;
  label: string;
}

export const getFormattedTimezones = (zones: Timezone[]): TimezoneForSelect[] => {
  return zones?.map(
    (timezone) => {
      const { zoneName, gmtOffset } = timezone;
      return {
        value: JSON.stringify({ zoneName, gmtOffset }),
        label: zoneName,
      };
    }
  )
}

export default getFormattedTimezones;