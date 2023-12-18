/* import { db} from "@/lib/db"; */
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client"
import { z } from "zod";

export async function GET() {
    return NextResponse.json({ success: true })
}
//Define a schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })


export async function POST(req: Request) {
    const prisma = new PrismaClient()

    try {
        const body = await req.json();

        const { email, username, password } =userSchema.parse(body)

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null, message: "User already exists (email)"

            }, { status: 409 });
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null, message: "User already exists (username)"
            }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        const { password: newuserPassword, ...rest } = newUser



        return NextResponse.json({
            user: newUser, message: "User created"
        }, { status: 201 });

    } catch (error) {
    return NextResponse.json({
            message: "Soemthing wrond"
        }, { status: 400 });
    }
}