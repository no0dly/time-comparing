import "./App.css";
import { Form, TimePicker, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TownSelect, { Timezone } from "./components/TownSelect";
import { useEffect, useState } from "react";
import { getListOfTimeZones } from "./api";
import getFormattedTimezones from "./utils/getFormattedTimezones";

dayjs.extend(customParseFormat);

interface FormValues {
  currentTimezone: string;
  searchedTimezone: string;
  time: Dayjs;
}

const { Item, useForm } = Form;
const { Text } = Typography;

function App(): JSX.Element {
  const [form] = useForm();
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [results, setResults] = useState<{
    time: string;
    searchedTime: string;
  }>({
    time: "",
    searchedTime: "",
  });

  const fetchTimezones = async () => {
    const { data }: any = await getListOfTimeZones();
    setTimezones(getFormattedTimezones(data?.zones ?? []));
  };

  const onFinishHandler = (values: FormValues) => {
    const utcDate = new Date(
      Date.UTC(0, 0, 0, (values.time as any).$H, (values.time as any).$m, 0)
    );

    const searchedOffset = JSON.parse(values.searchedTimezone)?.gmtOffset;
    const currentOffset = JSON.parse(values.currentTimezone)?.gmtOffset;

    if (searchedOffset || searchedOffset === 0) {
      const date =
        utcDate.getTime() + (searchedOffset * 1000 - currentOffset * 1000);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
      }).format(date);

      setResults({
        time: values.time.format("HH:mm"),
        searchedTime: formattedDate,
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
      >
        <div className="FormItem">
          <TownSelect timezones={timezones} fieldName="currentTimezone" />
        </div>
        <div className="FormItem">
          <TownSelect timezones={timezones} fieldName="searchedTimezone" />
        </div>
        <div className="FormTimePicker">
          <Item name="time">
            <TimePicker
              defaultOpenValue={dayjs("00:00:00", "HH:mm")}
              format="HH:mm"
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
