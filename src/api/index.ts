import axios from "axios";

const API_KEY: string = 'JP52BK6R205M';

const instance = axios.create({
  baseURL: 'http://api.timezonedb.com/v2.1/',
  timeout: 10000,
  params: { 'key': API_KEY, format: "json" }
});

export const getListOfTimeZones = () => instance.get('/list-time-zone');

