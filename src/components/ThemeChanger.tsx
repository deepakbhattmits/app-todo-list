// import { ReactComponent as SVGsun } from '../assets/icons/icon-sun.svg'
// import { ReactComponent as SVGmoon } from '../assets/icons/icon-moon.svg'
// import styles from './ThemeChanger.module.less'
// import { Button } from 'antd'
// const ThemeChanger = () => (
//   <div>
//     <Button shape="circle">
//       <SVGsun className={styles.icon} />
//     </Button>
//     <Button shape="circle">
//       <SVGmoon className={styles.icon} />
//     </Button>
//     ThemeChanger
//   </div>
// )
// export default ThemeChanger

import { useState, FC, ChangeEventHandler, MouseEventHandler } from 'react'
import { Button } from 'antd'
import { ReactComponent as SVGsun } from '../assets/icons/icon-sun.svg'
import { ReactComponent as SVGmoon } from '../assets/icons/icon-moon.svg'
import styles from './ThemeChanger.module.less'

const ThemeChanger: FC = (): JSX.Element => {
  const [theme, setTheme] = useState<string>('')
  const handleTheme: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('e. : ', e.target)
    // setTheme(e.target.name)
  }
  // const setDark = () => {
  //   localStorage.setItem('theme', 'dark')
  //   setTheme('dark')
  //   document.documentElement.setAttribute('data-theme', 'dark')
  // }

  // const setLight = () => {
  //   localStorage.setItem('theme', 'light')
  //   setTheme('light')
  //   document.documentElement.setAttribute('data-theme', 'light')
  // }

  // const storedTheme = localStorage.getItem('theme')

  // const prefersDark =
  //   window.matchMedia &&
  //   window.matchMedia('(prefers-color-scheme: dark)').matches

  // const defaultDark =
  //   storedTheme === 'dark' || (storedTheme === null && prefersDark)

  // if (defaultDark) {
  //   setDark()
  // }

  // const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if (e.target.checked) {
  //     setDark()
  //   } else {
  //     setLight()
  //   }
  // }

  // console.log('defaultDark :', defaultDark)
  return (
    <div className={styles.toggleThemeWrapper}>
      {theme === 'dark' ? (
        <Button name="dark" shape="circle" onClick={handleTheme}>
          <SVGsun
            className={styles.icon}
            onClick={(e) => e.stopPropagation()}
          />
        </Button>
      ) : (
        <Button name="light" shape="circle" onClick={handleTheme}>
          <SVGmoon
            className={styles.icon}
            onClick={(e) => e.stopPropagation()}
          />
        </Button>
      )}
      {/* <SVGsun className={styles.icon} />
      <label className={styles.toggleTheme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
      <SVGmoon className={styles.icon} />
       */}
    </div>
  )
}

export default ThemeChanger
