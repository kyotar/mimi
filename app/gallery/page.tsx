import { Suspense } from 'react'
import GalleryClient from './gallery-client'

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  return (
    <Suspense fallback={<div className="pt-14" />}>
      <GalleryClient initialCategory={searchParams.category} />
    </Suspense>
  )
}
