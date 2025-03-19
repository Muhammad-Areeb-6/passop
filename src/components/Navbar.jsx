import React from 'react'

const Navbar = () => {
  return (


    <nav className="bg-slate-600/70  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-2 md:p-4 lg:p-4 ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className='text-3xl font-bold'>
            <span className='text-green-700'>&lt;</span><span>pass</span><span className="text-green-700">Op&gt;</span>
          </h1>
        </a>
        <div className='flex items-center '>
          <div className="flex md:order-2 ml-8 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href='https://github.com/Muhammad-Areeb-6/passop.git' target='_blank' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">GitHub</a>

          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
