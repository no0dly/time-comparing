import { Select, Form } from "antd";
import { TimezoneForSelect } from "../../utils/getFormattedTimezones";

interface Props {
  timezones: TimezoneForSelect[];
  fieldName: string;
  label: string;
}

function TownSelect({ timezones, fieldName, label }: Props): JSX.Element {
  return (
    <Form.Item name={fieldName} rules={[{ required: true }]} label={label}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select city"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={timezones}
      />
    </Form.Item>
  );
}

export default TownSelect;
