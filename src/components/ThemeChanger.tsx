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

import { useState, FC, useCallback,ChangeEventHandler, MouseEventHandler  } from 'react'
import { Button, Tooltip } from 'antd'
import { ReactComponent as SVGsun } from '../assets/icons/icon-sun.svg'
import { ReactComponent as SVGmoon } from '../assets/icons/icon-moon.svg'
import styles from './ThemeChanger.module.less'

const ThemeChanger: FC = (): JSX.Element => {
  const [theme, setTheme] = useState<string>('light')
  const handleTheme:MouseEventHandler<HTMLButtonElement|HTMLOrSVGElement>=(e) =>
  {
    
    console.log('e. : ',e)
    // console.log('e. : ',e.target.name)
    // setTheme(e.target.name)
    if(theme==='light') {
      setDark()
    }
    else {
      setLight()
    }
  }
  const setDark = useCallback(() => {
    localStorage.setItem('theme', 'dark')
    setTheme('dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  },[])

  const setLight = useCallback(() => {
    localStorage.setItem('theme', 'light')
    setTheme('light')
    document.documentElement.setAttribute('data-theme', 'light')
  },[])

  return (
    <div className={styles.toggleThemeWrapper}>
       <Tooltip
            title={`Move to ${!!theme?.match(/dark/i)?.length ? "light" : "dark"}`}
            placement="bottom"
          >
      <Button
              className={styles.btnTheme}
             onClick={handleTheme}
        shape="circle"
        name={theme === 'dark'?'dark':'light'}
            >
              {theme === 'dark' ? (
                <SVGsun
            name="dark"
            className={styles.icon}
            onClick={handleTheme}
          />
              ) : (
                <SVGmoon
              name="light"
            className={styles.icon}
           onClick={handleTheme}
              
          />
              )}
            </Button>
    </Tooltip>
      {/* {theme === 'dark' ? (
        <Button  name="light" shape="circle" onClick={handleTheme}>
            <SVGmoon
              name="light"
            className={styles.icon}
            onClick={(e) => {e.stopPropagation(); e.preventDefault();}}
              
          />
        </Button>
      ) : (
        <Button  name="dark" shape="circle" onClick={handleTheme}>
          <SVGsun
            name="dark"
            className={styles.icon}
            onClick={(e) => {e.stopPropagation(); e.preventDefault();}}
          />
        </Button>
      )} */}
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
