import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { BsX } from 'react-icons/bs'
import logo from '../assets/logo.png'
import { ConnectWallet } from '@thirdweb-dev/react'
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Exchange', href: '#' },
  { name: 'Staking', href: '#' },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
      <div className='mx-auto bg-[#0c1226] text-white px-[20px]'>
        <div className='py-2 justify-between items-center hidden md:flex'>
          <div className='w-[90px] h-6'><Image src={logo} alt="Logo" /></div>
          <div className='w-full lg:w-[40%]  flex items-center justify-end mt-2'>
            <ConnectWallet />
          </div>
        </div>

        {/* Mobile Nav */}

        <div className='md:hidden py-4 justify-between flex items-center'>
          <div className='w-[40px] h-6'><Image src={logo} alt="Logo" /></div>

          {mobileMenuOpen === (true) ? (
            <button onClick={() => setMobileMenuOpen(false)}><BsX size={25} /></button>
          ) : (
            <FaBars onClick={() => setMobileMenuOpen(true)} />
          )}

        </div>

        {mobileMenuOpen && <div>
          <div className='p-[10px] grid grid-row bg-[#020710] text-slate-300 gap-4'>
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-semibold hover:text-[#14c2a3]">
                {item.name}
              </a>
            ))}
            <div className='flex justify-center items-center'>
              <ConnectWallet />
            </div>
          </div>
        </div>}

      </div>
    </div>
  );
};

export default Navbar