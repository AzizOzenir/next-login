import { AuthOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import React from 'react'

const Page = async() => {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  return (
    <div>
      <h1>welcome to admin {session?.user.email}</h1>
      
    </div>
  )
}

export default Page