import React from 'react'
import '../src/styles/globals.css'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {children}
    </div>
  )
}