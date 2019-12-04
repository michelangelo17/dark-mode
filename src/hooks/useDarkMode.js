import useLocalStorage from './useLocalStorage'
import { useEffect } from 'react'

const useDarkMode = initialValue => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', initialValue)
  useEffect(() => {
    darkMode
      ? (document.body.className += 'dark-mode')
      : document.body.classList.remove('dark-mode')
  }, [darkMode])
  return [darkMode, setDarkMode]
}

export default useDarkMode
