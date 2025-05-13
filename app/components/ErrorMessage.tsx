import React from 'react'

interface ErrorMessageProps {
  message: string | null
  className?: string
}

export default function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  if (!message) return null

  return (
    <div className={`mt-4 text-center text-md font-medium text-red-500 ${className}`}>
      {message}
    </div>
  )
}
