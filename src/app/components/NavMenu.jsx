"use client"

import { useUser } from "./UserContext";

const NavMenu = () => {
    const user = useUser();
    return (
        <div className="p-4 flex w-full justify-between">
            <div className="flex w-full gap-3">
                <a className="text-xl underline" href="">Home</a>
                <a className="text-xl underline" href="">Dashboard</a>
            </div>
            <div>
                {!user ? <a className="text-xl" href="">Login</a> :  <a className="text-xl" href="">{user.name}</a> }
            </div>
        </div>
    );
}

export default NavMenu;