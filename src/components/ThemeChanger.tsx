import { ReactComponent as SVGsun } from '../assets/icons/icon-sun.svg'
import { ReactComponent as SVGmoon } from '../assets/icons/icon-moon.svg'
import styles from './ThemeChanger.module.less'
import { Button } from 'antd'
const ThemeChanger = () => (
  <div>
    <Button shape="circle">
      <SVGsun className={styles.icon} />
    </Button>
    <Button shape="circle">
      <SVGmoon className={styles.icon} />
    </Button>
    ThemeChanger
  </div>
)
export default ThemeChanger
