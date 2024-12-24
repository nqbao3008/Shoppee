import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { Schema } from '../../utils/rule'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  // placeholder?: string
  // className?: string
  errorMessage?: string
  name: string
  rule?: RegisterOptions<FormData>
  // autoComplete?: string
  register: UseFormRegister<any>
}
export default function Input({
  type,
  placeholder,
  errorMessage,
  autoComplete,
  className,
  name,
  register,
  rule
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        {...register(name, rule)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-left'>{errorMessage}</div>
    </div>
  )
}
