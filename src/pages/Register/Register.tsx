import { useForm } from 'react-hook-form'
import { Schema, schema } from '../../utils/rule'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button/Button'
import path from '../../constants/path'
import authApi from '../../api/auth.api'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const resgisterAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password')
    resgisterAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            type errorType = Omit<FormData, 'confirm_password'>
            Object.keys(formError).forEach((errorKey) => {
              setError(errorKey as keyof errorType, {
                message: formError[errorKey as keyof errorType],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </div>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                className='mt-8'
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                register={register}
                autoComplete='on'
                errorMessage={errors.password?.message}
                className='mt-3'
              />

              <Input
                type='password'
                placeholder='Confirm Password'
                name='confirm_password'
                register={register}
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                className='mt-3'
              />
              <div className='mt-7'>
                <Button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={resgisterAccountMutation.isPending}
                  disabled={resgisterAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
