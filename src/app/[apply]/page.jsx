import ApplyForm from '@/components/ApplyForm'
import React from 'react'

export default function page({params}) {
    // console.log(params)
  return (
    <div>
      <ApplyForm jobId={params.apply}/>
    </div>
  )
}
