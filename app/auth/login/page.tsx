'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/LoginForm.module.css'
import ErrorMessage from '@/app/components/ErrorMessage'

export default function LoginForm () {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
      .then(async res => {
        const data = await res.json()
      
        if (!res.ok) {
          setError(data.message)
        } else {
          localStorage.setItem('token', data.token)
          router.replace('/')
        }
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
      })
  }

  return (
    <div className='max-w-sm mx-auto mt-30 p-4'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
        <h4 className='text-center text-s tracking-tight text-gray-400'>
          * contact the administrator to have one
        </h4>
      </div>
      
      {error && ( <ErrorMessage message={error} /> )}

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label htmlFor='username' className={styles.label}>
              Username
            </label>
            <div className='mt-2'>
              <input
                id='username'
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete='username'
                className={styles.input}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className={styles.label}>
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete='current-password'
                className={styles.input}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
