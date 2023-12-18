"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const UserAccountnav = () => {
  return (
    <div>
        <Button onClick={e=>signOut({
            redirect:true,
            callbackUrl:`${window.location.origin}/sign-in`
        })} variant="destructive">Logout</Button>
    </div>
  )
}

export default UserAccountnav