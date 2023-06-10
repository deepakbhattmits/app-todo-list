import { ChangeEvent, FC } from 'react'
import { Button, Input, Space } from 'antd'
interface IProps {
  onChange: (event: ChangeEvent) => void
  btnClick?: any
  placeholder: string
  allowClear?: boolean
  button?: boolean
  value?: string
  btnText?: string
}
const InputComp: FC<IProps> = ({
  onChange,
  btnClick,
  placeholder,
  allowClear = true,
  button = false,
  value,
  btnText,
}): JSX.Element => (
  <Space.Compact>
    <Input
      placeholder={placeholder}
      allowClear={allowClear}
      size="large"
      onChange={onChange}
      value={value}
    />
    {button ? (
      <Button type="primary" onClick={btnClick}>
        {btnText}
      </Button>
    ) : null}
  </Space.Compact>
)

export default InputComp
