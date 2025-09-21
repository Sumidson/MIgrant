import React from 'react'
import LoadingLogo from './loading'

interface LoadingWrapperProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
  isLoading, 
  children, 
  className = '' 
}) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <LoadingLogo />
      </div>
    )
  }

  return <>{children}</>
}

export default LoadingWrapper