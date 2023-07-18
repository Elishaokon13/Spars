import React from 'react'
import {  SideNav, MainContent } from '../components'


const Home = () => {
  return (
    <div className='container-lg main-container bg-[#141a31]  bg-blend-darken scroll-smooth hover:scroll-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='lg:col-span-1 col-span-4 w-full '>
            <SideNav />
        </div>
        <div className="lg:col-span-3  col-span-1 ">
          <div className="lg:sticky relative top-10 w-full">
            <MainContent />    
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home