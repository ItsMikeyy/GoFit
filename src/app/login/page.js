"use client";
import {signIn} from "next-auth/react"
export default function Login() {
    return (
      <>
        <div>
          <h1 className="text-4xl">Login</h1>
          <button onClick={() => signIn("google")}>Login</button>
        </div>
      </>
    );
  }
  