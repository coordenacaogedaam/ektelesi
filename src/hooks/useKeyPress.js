/**
 * From https://usehooks.com/useKeyPress/
 */

import { useState, useEffect } from 'react'

export function useKeyPress(targetKey, onKeyDown) {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true)
        if (typeof onKeyDown === 'function') onKeyDown()
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [onKeyDown, targetKey])

  return keyPressed
}
