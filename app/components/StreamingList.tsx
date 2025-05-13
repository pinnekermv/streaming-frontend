'use client'

import StreamingItem from './StreamingItem'
import { Streaming } from '../types/streaming'

type Props = {
  streamings: Streaming[]
}

export default function StreamingList ({ streamings }: Props) {
  // todo
  //   if (! streamings ||  streamings.length === 0) {
  //     return (
  //       <div className='text-center text-gray-500 mt-8'>No videos for now.</div>
  //     )
  //   }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {streamings.map(streaming => (
        <StreamingItem key={streaming.id} streaming={streaming} />
      ))}
    </div>
  )
}
