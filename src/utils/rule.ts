import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in keyof Schema]: RegisterOptions<Schema> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  },
  name: {
    required: {
      value: true,
      message: 'email required'
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

const handleMinPriceYup = () => {
  return yup.string().test({
    name: 'price-not-allowed',
    message: 'Unreasonable Min Price!!!',
    test: function (value) {
      const price_min = value as string
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_min) < Number(price_max)
      }
      return price_min !== '' || price_max !== ''
    }
  })
}

const handleMaxPriceYup = () => {
  return yup.string().test({
    name: 'price-not-allowed',
    message: 'Unreasonable Max Price!!!',

    test: function (value) {
      const price_max = value
      const { price_min } = this.parent
      if (price_min !== '' && price_max !== '') {
        return Number(price_min) < Number(price_max)
      }
      return price_min !== '' || price_max !== ''
    }
  })
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
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: handleMinPriceYup(),
  price_max: handleMaxPriceYup(),
  name: yup.string().trim().required('name required')
})

export type Schema = yup.InferType<typeof schema>
