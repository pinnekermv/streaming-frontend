'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StreamingList from './components/StreamingList'
import { Streaming } from './types/streaming'
import ErrorMessage from './components/ErrorMessage'

export default function Home () {
  const [streamings, setStreamings] = useState<Streaming[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/auth/login')
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/streaming`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) throw new Error('Unauthorized or failed to fetch')
        const data = await res.json()
        setStreamings(data)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch videos')
      })
  }, [router])

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Streaming Videos</h1>
      <p>
        Welcome to our streaming service, where you can enjoy unique nature videos from around the world.
        From the sounds of the forest to the sounds of the ocean, immerse yourself in the atmosphere of peace, beauty and harmony with the world around you.
      </p>

      <div className='mt-6'>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <StreamingList streamings={streamings} />
        )}
      </div>
    </main>
  )
}
