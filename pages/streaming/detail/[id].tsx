import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Streaming } from '@/app/types/streaming'

export default function StreamingDetailPage () {
  const router = useRouter()
  const { id } = router.query
  const [streaming, setStreaming] = useState<Streaming>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  console.log(id)
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token || token === 'undefined') {
      router.replace('/auth/login')
    }

    fetch(`http://localhost:3000/streaming/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) throw new Error('Unauthorized or failed to fetch')
        const data = await res.json()
        setStreaming(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch videos')
        setLoading(false)
      })
  }, [router])

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Streaming Video #{id}</h1>

      <div className='mt-6'>
        {loading ? (
          <p className='text-gray-500'>Loading...</p>
        ) : streaming ? (
          <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-lg font-bold text-gray-800 mb-6'>
              {streaming.title}
            </h1>

           <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg shadow overflow-hidden">
              <video
                src={streaming.videoUrl}
                controls
                className="w-full h-full object-contain rounded"
              />
            </div>

            <p className='text-gray-700 text-base leading-relaxed'>
              {streaming.description}
            </p>
          </div>
        ) : (
          <p className='text-red-500'>Streaming not found</p>
        )}
      </div>
    </main>
  )
}
