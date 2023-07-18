import React from 'react'
import { Home, Money } from '@mui/icons-material'
import Link from 'next/link'

const SideNav = () => {
  return (
    <div className='hidden col-span-1 h-[100vh] text-white py-[6rem] lg:flex flex-col gap-8'>
      <Link href='/'>
        <div className='flex items-center w-[50%] justify-between text-gray-500 '>
          <div className='h-full w-1  py-5 rounded'></div>
          <div className='grid grid-cols-2 w-[50%]'>
            <Home />
            <div className='flex flex-col items-start gap-2'>
              <p className='text-white'>Dashboard</p>
            </div>
          </div>
        </div>
      </Link>
      <Link href='/'>
        <div className='flex items-center w-[50%] justify-between text-gray-500 '>
          <div className='h-full w-1  py-5 rounded'></div>
          <div className='grid grid-cols-2 w-[50%]'>
            <Money />
            <div className='flex flex-col items-start gap-2'>
              <p className='text-white'>Trade</p>
            </div>
          </div>
        </div>
      </Link>
      <Link href='/'>
        <div className='flex items-center w-[50%] justify-between text-gray-500 '>
          <div className='h-full w-1  py-5 rounded'></div>
          <div className='grid grid-cols-2 w-[50%]'>
            <Money />
            <div className='flex flex-col items-start gap-2'>
              <p className='text-white'>Staking</p>
            </div>
          </div>
        </div>
      </Link>


    </div>
  )
}

export default SideNav