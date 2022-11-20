import { Select, Form } from "antd";

export interface Timezone {
  value: string;
  label: string;
}

interface Props {
  timezones: Timezone[];
  fieldName: string;
}

function TownSelect({ timezones, fieldName }: Props): JSX.Element {
  return (
    <Form.Item name={fieldName} rules={[{ required: true }]}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select your town"
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
