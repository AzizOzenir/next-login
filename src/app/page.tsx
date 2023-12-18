import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "lucide-react";
import { getServerSession } from "next-auth";

 async function  Home  ()  {
  const session = await getServerSession()

  return <div className='text-4xl'>
    <h1>Home</h1>
    <Link className={buttonVariants()} href='/admin' >Open My Admin</Link>
    <h2>Client Sessison</h2>
    <User />
    <h2>Server Session</h2>
    {JSON.stringify(session)}
  </div>;
}

export default Home