import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in keyof Schema]: RegisterOptions<Schema> }

export const getRule = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'email required'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    },
    maxLength: {
      value: 160,
      message: 'email length is 5-160'
    },
    minLength: {
      value: 5,
      message: 'email length is 5-160'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password required'
    },
    maxLength: {
      value: 160,
      message: 'Password length is 6-160'
    },
    minLength: {
      value: 6,
      message: 'Password length is 6-160'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password required'
    },
    maxLength: {
      value: 160,
      message: 'Confirm password length is 6-160'
    },
    minLength: {
      value: 6,
      message: 'Confirm password length is 6-160'
    },
    validate: {
      matchPassword: (value) => {
        if (getValues) {
          const { password } = getValues() || {}
          if (value !== password) {
            return 'Confirm password is not match password'
          }
        }
      }
    }
  }
})

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm password required')
    .min(6, 'Confirm password length is 6-160')
    .max(160, 'Confirm password length is 6-160')
    .oneOf([yup.ref(refString)], 'Confirm password is not match password')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email required')
    .email('Invalid email address')
    .min(6, 'Password length is 6-160')
    .max(160, 'Password length is 6-160'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password length is 6-160')
    .max(160, 'Password length is 6-160'),
  confirm_password: handleConfirmPasswordYup('password')
})

export type Schema = yup.InferType<typeof schema>
