import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const validatePhone = (phone) => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/
    return bdPhoneRegex.test(phone)
  }

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    if (!validatePhone(phone)) {
      toast.error("❌ Valid Bangladeshi mobile number দিন (11 digits)")
      return
    }

    try {

      if (currentState === 'Sign Up') {

        const response = await axios.post(
          backendUrl + '/api/user/register',
          { name, phone, password }
        )

        if (response.data.success) {

          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)

          toast.success("✅ Account created successfully!", {
            toastId: "signup-success"
          })

        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(
          backendUrl + '/api/user/login',
          { phone, password }
        )

        if (response.data.success) {

          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)

          toast.success("✅ Login Successful!", {
            toastId: "login-success"
          })

        } else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {

      console.log(error)
      toast.error("❌ Something went wrong!")

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (

    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null :
        <input
          type="text"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800'
          required
        />
      }

      <input
        type="tel"
        placeholder='Mobile Number (01XXXXXXXXX)'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='w-full px-3 py-2 border border-gray-800'
        maxLength={11}
        required
      />

      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full px-3 py-2 border border-gray-800'
        required
      />

      <div className='w-full flex justify-between text-sm'>

        <p className='cursor-pointer'>Forgot password?</p>

        {currentState === 'Login'
          ?
          <p
            onClick={() => setCurrentState('Sign Up')}
            className='cursor-pointer'
          >
            Create account
          </p>
          :
          <p
            onClick={() => setCurrentState('Login')}
            className='cursor-pointer'
          >
            Login Here
          </p>
        }

      </div>

      <button className='bg-black text-white px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

    </form>

  )
}

export default Login
