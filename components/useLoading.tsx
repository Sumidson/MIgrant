import { useState, useEffect } from 'react'

interface UseLoadingOptions {
  initialDelay?: number
  minLoadingTime?: number
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialDelay = 1000, minLoadingTime = 800 } = options
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => {
    setTimeout(() => setIsLoading(false), minLoadingTime)
  }

  return { isLoading, startLoading, stopLoading }
}