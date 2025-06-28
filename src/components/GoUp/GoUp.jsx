import React, { useState } from 'react'
import Styles from './GoUp.module.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function GoUp() {
  const [isShowBtn, setIsShowBtn] = useState(false)
  window.onscroll = () => {
    if (scrollY > 200) {
      setIsShowBtn(true)
    } else {
      setIsShowBtn(false)
    }
  }
  const GoUp = () => {
    window.scrollTo(0, 0)
  }
  return (
    <>
      {isShowBtn &&
        <KeyboardArrowUpIcon
          className={Styles.goUpFloatIcon}
          // fontSize='inherit'
          // style={{position: 'fixed', cursor:'pointer'}}
          onClick={GoUp}
        />
      }
    </>
  )
}
