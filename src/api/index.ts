import axios from "axios";

const API_KEY: string = 'JP52BK6R205M';

const instance = axios.create({
  baseURL: 'https://api.timezonedb.com/v2.1/',
  timeout: 10000,
  params: { 'key': API_KEY, format: "json" }
});

export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  countryCode: string;
  countryName: string;
  timestamp: number;
}

interface ListTimezoneResponse {
  zones: Timezone[]
}

export const getListOfTimeZones = () => instance.get<ListTimezoneResponse>('/list-time-zone');

