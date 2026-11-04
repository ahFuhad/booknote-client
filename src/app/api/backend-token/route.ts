import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const secret = process.env.JWT_SECRET;
  if (!secret)
    return NextResponse.json(
      { message: "JWT_SECRET missing" },
      { status: 500 },
    );
  const token = jwt.sign(
    {
      sub: session.user.id,
      email: session.user.email,
      name: session.user.name,
      iss: "booknook-client",
    },
    secret,
    { expiresIn: "10m" },
  );
  return NextResponse.json({ token });
}
