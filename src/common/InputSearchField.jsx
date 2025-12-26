/*
InputSearchField.jsx
A highly customizable input component built with Tailwind CSS.

Features:
- MUI-like design system with variants (outlined, filled, standard)
- Built-in autoFocus, label animation, error/helper text support
- Responsive width (via `width` prop or default %)
- Full accessibility (labelled by, described by, aria-invalid, etc.)
- System design: separation of presentation (Tailwind) and behavior (React)

Usage Example:
<InputSearchField
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  autoFocus
  required
  variant="outlined"
  error={!!error}
  helperText={error || 'Enter your username'}
  width="80%"
/>
*/

import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

export default function InputSearchField({
  id,
  name,
  label = '',
  type = 'text',
  value = '',
  onChange = () => {},
  placeholder = '',
  autoFocus = false,
  variant = 'outlined', // outlined | filled | standard
  error = false,
  helperText = '',
  disabled = false,
  required = false,
  width = '100%', // supports responsive % or Tailwind width classes
  className = '',
  inputClassName = '',
  labelClassName = '',
  helperClassName = '',
  onFocus,
  onBlur,
  startAdornment = null,
  endAdornment = null,
  inputRef: externalInputRef
}) {
  const inputRef = externalInputRef || useRef(null)
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(value))
  

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
      setFocused(true)
    }
  }, [autoFocus])

  useEffect(() => {
    setHasValue(Boolean(value))
  }, [value])

  const handleFocus = (e) => {
    setFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setFocused(false)
    onBlur?.(e)
  }

  const variantClasses = {
    outlined: 'border border-slate-300 rounded-lg focus-within:border-indigo-500',
    filled: 'bg-slate-100 rounded-lg focus-within:ring-2 ring-indigo-500',
    standard: 'border-b border-slate-400 focus-within:border-indigo-500',
  }

  const labelPosition = focused || hasValue ? '-top-2 text-xs text-indigo-600' : 'top-2 text-slate-500'

  return (
    <div
      className={clsx('relative flex flex-col', className)}
      style={{ width }}
    >
      <div className={clsx('flex items-center px-3 py-2 transition-all duration-150', variantClasses[variant], disabled && 'opacity-50 cursor-not-allowed')}>
        {startAdornment && <div className="mr-2 text-slate-500">{startAdornment}</div>}

        <div className="relative flex-1">
          {label && (
            <label
              htmlFor={id}
              className={clsx('absolute left-1 transition-all duration-150 pointer-events-none', labelPosition, labelClassName)}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <input
            id={id}
            name={name}
            ref={inputRef}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={clsx(
              'w-full bg-transparent focus:outline-none text-slate-900 pt-4 pb-1 placeholder-transparent',
              inputClassName
            )}
            aria-invalid={error}
            aria-describedby={helperText ? `${id}-helper` : undefined}
          />
        </div>

        {endAdornment && <div className="ml-2 text-slate-500">{endAdornment}</div>}
      </div>

      {helperText && (
        <p
          id={`${id}-helper`}
          className={clsx(
            'mt-1 text-xs',
            error ? 'text-red-500' : 'text-slate-500',
            helperClassName
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}