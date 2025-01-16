"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
    const session = useSession();

    if (session) {
        return (
            <>
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        );
    }
    return(
        <>
            Not signed in
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

const NavMenu = () => {
    return (
        <div>
            <AuthButton />
        </div>
    );
}

export default NavMenu;