import React from 'react'

const LoginForm = () => {
  return (
  
         <div className=' h-100  w-lg mx-auto bg-linear-to-b from-cyan-50 to-cyan-200 rounded-2xl'>
        <form action="">
            <div className=''>
                <h1 className=' text-slate-500   text-4xl font-SemiBold tracking-tight  mt-10 px-10'>Login To Your Account</h1>
                <p className='  text-lg tracking-wide px-10 py-2'>Don't have an account? <a className='text-blue-600' href="/Signin">SignIn</a> to your Account</p>
            </div>
            <div className='flex flex-col max-w-xs  gap-4 mt-10'>
                
                <input className='px-10 mx-10 border  border-neutral-700 rounded-md shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300' id="email" type="text" placeholder='Enter Your Email' />
                <input className='px-10 mt-3 border border-neutral-700 rounded-md mx-10 shadow-sm hover:shadow-md focus:shadow-xl transition-all duration-300' id="password" type="password" placeholder='Enter Your Password' />
            <button className=' mx-10 mt-5 bg-blue-500 px-4 py-2 rounded-md text-white cursor-pointer transition duration-300 hover:bg-blue-600'>Login</button>

            </div>
            
        </form>
      
    </div>
      
    
  )
}

export default LoginForm
