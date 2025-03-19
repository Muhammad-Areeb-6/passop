import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
            <footer className='bg-slate-600/70 fixed w-full z-20 bottom-0 start-0 border-t space-y-3 border-gray-200'>
                <h1 className='text-3xl text-center font-bold'>
                    <span className='text-green-700'>&lt;</span><span>pass</span><span className="text-green-700">Op&gt;</span>
                </h1>

                <div className="footer-bottom text-center">
                    <p>&copy; {currentYear} passOp All rights reserved.</p>
                </div>
            </footer>
    )
}

export default Footer
