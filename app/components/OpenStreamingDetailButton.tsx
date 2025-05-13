'use client'
import React from 'react'
import Link from 'next/link'
import styles from '../styles/Button.module.css'

type Props = {
  id: number
}

export default function OpenStreamingDetailButton ({ id }: Props) {
  return (
    <div className='flex justify-end mt-4'>
      <Link key={id} href={`/streaming/detail/${id}`}>
        <button
          type='button'
          className={styles.openButton}
        >
          Open
        </button>
      </Link>
    </div>
  )
}
