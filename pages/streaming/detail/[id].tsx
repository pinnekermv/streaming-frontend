import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Streaming } from '@/app/types/streaming'
import ErrorMessage from '@/app/components/ErrorMessage'

export default function StreamingDetailPage () {
  const router = useRouter()
  const { id } = router.query
  const [streaming, setStreaming] = useState<Streaming>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    
    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/auth/login')
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/streaming/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok || data?.statusCode === 404) {
          setError(data.message)
          setLoading(false)
        } else {
          setStreaming(data)
          setLoading(false)
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to fetch video')
        setLoading(false)
      })
  }, [id, router])

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Streaming Video #{id}</h1>

      <div className='mt-6'>
        {loading ? (
          <p className='text-gray-500'>Loading...</p>
        ) : error ? (
          <ErrorMessage message={error} />
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
          <ErrorMessage message={'Streaming not found'} />
        )}
      </div>
    </main>
  )
}
