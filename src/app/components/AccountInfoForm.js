"use client";
const AccountInfoForm = () => {
    return (
        <form className="m-auto">
            <input className="border-solid border-2 border-black p-1 m-2" placeholder="First Name"/>
            <br />
            <input className="border-solid border-2 border-black p-1 m-2" placeholder="Last Name"/>
            <br />
            <input className="border-solid border-2 border-black p-1 m-2" placeholder="Age"/>
            <br />
            <input className="border-solid border-2 border-black p-1 m-2" placeholder="Weight"/>
            <br />
            <input className="border-solid border-2 border-black p-1 m-2" placeholder="Height"/>
            <br />
            <button className="border-solid border-2 border-black px-4 py-2 m-2" type="submit">Submit</button>
        </form>
    )
}

export default AccountInfoForm;