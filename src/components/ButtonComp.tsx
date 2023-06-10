import { FC } from 'react'
import { Button } from 'antd'
import styles from './Button.module.less'
interface IProps {
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined
  btnText: string
  onClick: any
  style?: object
  value?: string
}
const ButtonComp: FC<IProps> = ({
  type,
  btnText,
  style,
  value,
  onClick,
}): JSX.Element => (
  <Button
    className={styles.customButton}
    type={type}
    onClick={onClick}
    style={style}
    value={value}
  >
    {btnText}
  </Button>
)
export default ButtonComp
