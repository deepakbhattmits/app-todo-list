import { FC } from 'react'
import styles from './Layout.module.less'
import ThemeChanger from './ThemeChanger'
interface IProps {
  headerContent: string
}
const Layout: FC<IProps> = ({ headerContent }): JSX.Element => {
  return (
    <header data-testid='header' className={styles.header}>
      {headerContent}
      <ThemeChanger />
       
    </header>
  )
}
export default Layout
