import React from 'react'
import { Dashboard } from './index'

const MainContent = () => {
  return (
    <div>
      <div className='h-[100vh] text-white lg:py-[4rem] py-[3rem] lg:flex flex-col gap-8 items-start overflow-auto px-6'>
        {/* header */}
        <div className='flex flex-col gap-2 lg:mb-0 mb-6 items-start'>
          
          <h1 className='text-2xl'>Dashboard</h1>
          <div className='bg-[#14c2a3] w-[70%] h-[3px]'></div>
        </div>
        {/* dashboard */}
        <Dashboard />
      </div>
    </div>
  )
}

export default MainContent