import { FC } from 'react'
import { Space } from 'antd'
import styles from './Layout.module.less'
import ThemeChanger from './ThemeChanger'
interface IProps {
  headerContent: string
}
const Layout: FC<IProps> = ({ headerContent }): JSX.Element => {
  return (
    <header className={styles.header}>
      <Space.Compact>
        {headerContent}
        <ThemeChanger />
      </Space.Compact>
    </header>
  )
}
export default Layout
