import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function GoUp() {
  const [isShowBtn, setIsShowBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShowBtn(true)
      } else {
        setIsShowBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const GoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isShowBtn &&
        <KeyboardArrowUpIcon
          className="bg-gradient-to-bl from-indigo-600 to-indigo-900 text-white !w-12 !h-12 fixed rounded-full bottom-4 right-4 cursor-pointer z-30"
          onClick={GoUp}
        />
      }
    </>
  )
}