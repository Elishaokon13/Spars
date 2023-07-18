import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { BsX } from 'react-icons/bs'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <div>
      <div className='container mx-auto text-white px-[20px]'>
        <div className='py-4 justify-between items-center hidden md:flex'>
          <div className='w-[40px]'><img src={logo} alt="MintyplexLogo" /></div>
          {/* <div className='flex gap-8'>
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-semibold hover:text-[#2063F2]">
                {item.name}
              </a>
            ))}
          </div> */}
          
          {/* {connectedAddress ? (
            <div className="flex gap-2">
              <button className="">
                {connectedAddress.length > 0 && `${connectedAddress.substring(0, 5)}...${connectedAddress.substring(12)}`}
              </button>
              <div onClick={logout}>
                <button className="px-6 py-2 bg-[#2063F2] hover:bg-[#fff] hover:text-[#2063F2] text-[14px] w-fit text-[#fff] rounded-3xl">
                Logout
                </button>
              </div>
            </div> ) :
            <div onClick={Web3modal}>
              <button className="px-6 py-2 bg-[#2063F2] hover:bg-[#fff] hover:text-[#2063F2] text-[14px] w-fit text-[#fff] rounded-3xl">
              Connect wallet
            </button>
            </div>
          } */}

        </div>

        {/* Mobile Nav */}
        
        <div className='md:hidden py-4 justify-between flex items-center'>
          <div className='w-[40px]'><img src={logo} alt="MintyplexLogo" /></div>
        
            { mobileMenuOpen === (true) ? (
              <button onClick={() => setMobileMenuOpen(false)}><BsX size={25}/></button>
            ) : (
              <FaBars onClick={() => setMobileMenuOpen(true)}/>
            )}
         
        </div>

        {mobileMenuOpen && <div>
          <div className='p-[10px] grid grid-row bg-[#020710] text-slate-300 gap-4'>
            {/* {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-semibold hover:text-[#2063F2]">
                {item.name}
              </a>
            ))}             */}
            {/* {connectedAddress ? (
              <div className="flex gap-2">
                <button className="">
                  {connectedAddress.length > 0 && `${connectedAddress.substring(0, 5)}...${connectedAddress.substring(12)}`}
                </button>
                <div onClick={logout} >
                  <button className="px-6 py-2 bg-[#2063F2] hover:bg-[#fff] hover:text-[#2063F2] text-[14px] w-fit text-[#fff] rounded-3xl">
                  Logout
                  </button>
                </div>
              </div> ) :
              <div onClick={Web3modal} >
                <button className="px-6 py-2 bg-[#2063F2] hover:bg-[#fff] hover:text-[#2063F2] text-[14px] w-fit text-[#fff] rounded-3xl">
                Connect wallet
              </button>
              </div>
            } */}
          </div>
        </div>}

      </div>
    </div>
  );
};

export default Navbar