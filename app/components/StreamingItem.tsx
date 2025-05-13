import React from 'react'
import Image from 'next/image'
import OpenStreamingDetailButton from './OpenStreamingDetailButton'
import { Streaming } from '../types/streaming'

type Props = {
  streaming: Streaming
}

export default function StreamingItem ({ streaming }: Props) {
  return (
    <div
      key={streaming.id}
      className='border rounded-lg shadow overflow-hidden'
    >
      <figure>
        <Image
          src={streaming.thumbnail}
          alt={streaming.title}
          width={800}
          height={600}
          className='w-full h-48 object-cover'
          style={{ width: '100%', height: 'auto' }}
        />
      </figure>

      <div className='p-4'>
        <h2 className='font-bold text-lg mb-2'>{streaming.title}</h2>
        <p>{streaming.description}</p>
        <OpenStreamingDetailButton id={streaming.id} />
      </div>
    </div>
  )
}
