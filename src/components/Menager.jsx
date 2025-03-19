import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Menager = () => {
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    let getPassword = async () => {
        // for database
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)

        //   for localStorage
        //   let passwords = localStorage.getItem('passwords')
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))
        // }
    }


    useEffect(() => {
        getPassword()

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes('show.svg')) {
            ref.current.src = 'hide.svg'
            passwordRef.current.type = "password"
        } else {
            ref.current.src = 'show.svg'
            passwordRef.current.type = "text"
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Text copied to clipboard!", { position: "bottom-right" })
    }

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // for database 

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // for localStorage uncomment this
            // localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            setform({ site: '', username: '', password: '' })
            toast("Password save!")
        } else {
            toast("You should write some thing!")
        }
    }

    const editPassword = (id) => {

    setform({...passwordArray.filter(i => i.id === id)[0], id:id})

        // for localStorage uncomment this
        // setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const deletePassword = async (id) => {
        let c = confirm("Do you realy want to delete this item?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // for database
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            // for localStorage uncomment this
            // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast("Password deleted!")

        } else {
            toast("Password not deleted!")

        }


    }
    return (
        <>
            <ToastContainer position="bottom-right" autoClose={1500} />
            <div className='container  mt-25 mx-auto'>
                <div className='text-center space-y-3'>
                    <h1 className='text-3xl font-bold'>
                        <span className='text-green-700'>&lt;</span><span>pass</span><span className="text-green-700">Op&gt;</span>
                    </h1>
                    <p className='text-green-700 text-lg'>Your simple password Menager</p>
                </div>
                <div className='flex items-center flex-col gap-4 sm:px-4 mt-6'>
                    <input value={form.site} onChange={handelChange} name='site' type="text" placeholder='Enter website Url' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg outline-green-400 bg-gray-50 focus:ring-green-500 focus:border-green-500 " />
                    <div className='flex items-center w-full space-x-4'>
                        <input value={form.username} required onChange={handelChange} name='username' type="text" placeholder='Enter Username' className="p-2 w-full text-green-900 border border-green-300 rounded-lg outline-green-400 bg-gray-50  focus:ring-green-500 focus:border-green-500 " />
                        <input ref={passwordRef} value={form.password} onChange={handelChange} name='password' type="password" placeholder='Enter Password' className="p-2 w-1/2 sm:block  text-green-900 border border-green-300 rounded-lg outline-green-400 bg-gray-50  focus:ring-green-500 focus:border-green-500 " />
                        <span className='cursor-pointer' onClick={showPassword} ><img ref={ref} className='w-10' src="hide.svg" alt="toggleMe" /></span>
                    </div>
                    <button onClick={savePassword} type="button" className="text-white w-fit flex items-center gap-2 justify-center bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2">
                        <img className='bg-transparent w-8' src="add.gif" alt="add it" />
                        Add Password</button>
                </div>



                <div className="relative overflow-x-auto py-6">
                    <h2 className='text-2xl font-semibold text-green-500 text-center mb-6'>Your Password</h2>
                    {passwordArray.length === 0 && <h2 className='text-xl font-semibold text-green-500 text-center'>No Passwords Found!</h2>}
                    {passwordArray.length !== 0 &&
                        <table className="w-full rounded-md overflow-x-auto  text-sm text-left rtl:text-right">
                            <thead className="text-white uppercase bg-green-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Site Url
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        UserName
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return (

                                        <tr className=" border-b border-green-300  ">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                <a href={item.site} target='_blank'> {item.site} </a>
                                                <span className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <img className='inline' src="copy.svg" alt="copy me" />
                                                </span>

                                            </th>
                                            <td className="px-6 py-4">
                                                {item.username}

                                                <span className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <img className='inline' src="copy.svg" alt="copy me" />
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                               {"*".repeat(item.password.length)}

                                                <span className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <img className='inline' src="copy.svg" alt="copy me" />
                                                </span>
                                            </td>
                                            <td className="px-6 space-x-3 py-4">
                                                <button onClick={() => { editPassword(item.id) }} className="font-medium  cursor-pointer"><img src="edit.svg" alt="edit" /></button>
                                                <button onClick={() => { deletePassword(item.id) }} className="font-medium cursor-pointer"><img className='w-8' src="delete.gif" alt="delete" /></button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>}
                </div>


            </div>
        </>
    )
}

export default Menager
