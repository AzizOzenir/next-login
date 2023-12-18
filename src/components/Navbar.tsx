import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import {signOut} from "next-auth/react"
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/app/api/auth/[...nextauth]/options';
import UserAccountnav from './UserAccountNav';
const Navbar = async () => {
  const session = await getServerSession(AuthOptions);

  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>
        {session?.user ? <UserAccountnav/>: (<Link className = { buttonVariants() } href = '/sign-in'>
          Sign in
      </Link>)}
    </div>
    </div >
  );
};

export default Navbar;
