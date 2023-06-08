import { FC } from 'react'
import styles from './Layout.module.less'
interface IProps {
  headerContent: string
}
const Layout: FC<IProps> = ({ headerContent }): JSX.Element => {
  console.log('styles : ', styles)
  return <header className={styles.header}>{headerContent}</header>
}
export default Layout
