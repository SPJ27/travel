
'use client'

import React from 'react'

type ButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const Button = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-sm bg-neutral-900 px-6 py-1.5 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
