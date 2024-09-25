import AdminJobCard from '@/components/AdminJobCard'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      <AdminJobCard />
      <div className="border w-[50%]">
        {
          job.applicants.map((item,index)=>{
            <ul key={index}>
              <li>{item.name}</li>
              <li>{item.email}</li>
              <Link href={item.resume} target="_blank"><li>View Resume</li></Link>
            </ul>
          })
        }
      </div> 
    </div>
  )
}
