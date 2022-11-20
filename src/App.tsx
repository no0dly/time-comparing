import "./App.css";
import { Form, TimePicker, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TownSelect from "./components/TownSelect";
import { useEffect, useState } from "react";
import { getListOfTimeZones } from "./api";
import getFormattedTimezones, {
  TimezoneForSelect,
} from "./utils/getFormattedTimezones";
import { TIME_FORMAT } from "./utils/constants";
import getSearchedTime from "./utils/getSearchedTime";

dayjs.extend(customParseFormat);

export interface FormValues {
  currentTimezone: string;
  searchedTimezone: string;
  time: Dayjs;
}

const { Item, useForm } = Form;
const { Text } = Typography;

function App(): JSX.Element {
  const [form] = useForm();
  const [timezones, setTimezones] = useState<TimezoneForSelect[]>([]);
  const [results, setResults] = useState<{
    time: string;
    searchedTime: string;
  }>({
    time: "",
    searchedTime: "",
  });

  const fetchTimezones = async () => {
    const { data } = await getListOfTimeZones();
    setTimezones(getFormattedTimezones(data?.zones ?? []));
  };

  const onFinishHandler = (values: FormValues) => {
    const searchedTime = getSearchedTime(values);

    if (searchedTime) {
      setResults({
        time: values.time.format(TIME_FORMAT),
        searchedTime: searchedTime,
      });
    } else {
      console.error("something went wrong");
    }
  };

  const onValuesChange = (value: string, values: FormValues) => {
    if (values.currentTimezone && values.searchedTimezone && values.time) {
      onFinishHandler(values);
    } else {
      setResults({ time: "", searchedTime: "" });
    }
  };

  useEffect(() => {
    fetchTimezones();
  }, []);

  return (
    <div className="App">
      <Form
        form={form}
        name="time-form"
        className="Form"
        onFinish={onFinishHandler}
        onValuesChange={onValuesChange}
        layout="vertical"
      >
        <div className="FormItem">
          <TownSelect
            timezones={timezones}
            fieldName="currentTimezone"
            label="Your location"
          />
        </div>
        <div className="FormItem">
          <TownSelect
            timezones={timezones}
            fieldName="searchedTimezone"
            label="Queried location"
          />
        </div>
        <div className="FormTimePicker">
          <Item
            name="time"
            label="Time in you location"
            rules={[{ required: true }]}
          >
            <TimePicker
              defaultOpenValue={dayjs("00:00:00", TIME_FORMAT)}
              format={TIME_FORMAT}
            />
          </Item>
        </div>
        <div className="Result">
          <Text>Your time: {results.time}</Text>
          <Text className="ResultSeparator">{`----->`}</Text>
          <Text>Searched time: {results.searchedTime}</Text>
        </div>
      </Form>
    </div>
  );
}

export default App;
