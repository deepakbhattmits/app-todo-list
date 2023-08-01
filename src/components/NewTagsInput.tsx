import { FC } from "react";
import { Select, Typography } from "antd";
const { Text } = Typography;

interface IProps {
  tags: { tag: string }[];
  onChange: (value: string) => void;
}

const NewTagsInput: FC<IProps> = ({ tags, onChange }): JSX.Element => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <Select
        mode="tags"
        tokenSeparators={[" ", "\n"]}
        showArrow={false}
        allowClear
        open={false}
        style={{ width: "100%" }}
        placeholder="Tags Mode"
        onChange={handleChange}
      />
      {tags?.length > 0 ? <Text strong>{tags?.length}</Text> : null}
    </>
  );
};

export default NewTagsInput;
