import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import thunderBolt from '../assets/thunder-bolt1.png'
import Image from 'next/image';

const Dashboard = () => {
    const [totalSupply, setTotalSupply] = useState('');
    const [liquidity, setLiquidity] = useState('');


    const formatNumber = (num) => {
        const tier = Math.log10(num) / 3 | 0;
        if (tier === 0) return num.toFixed(0);
        const scale = Math.pow(10, tier * 3);
        const scaled = num / scale;
        return scaled.toFixed(2);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x593649f70f836565e33f0bce9af9503c243359b3&apikey=RK9BKPUGPM4MIXZBXK4QWTYCW3YRN3WGKF');
                const data = await response.json();
                const totalSupplyValue = data.result && !isNaN(data.result) ? Number(data.result) : 0;
                setTotalSupply(formatNumber(totalSupplyValue));
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className='w-full lg:pr-16 flex flex-col gap-8'>
            {/* account */}
            <div className='flex flex-col gap-3 items-start  w-full'>
                <p>Your account</p>
                {/* <div className='grid lg:grid-cols-2 gap-3  w-full'>
                    <div className='rounded-lg border-[4px]  border-dashed flex items-center justify-center h-[150px]'>
                        <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                    </div>
                    <div className='rounded-lg border-[4px]  border-dashed flex items-center justify-center h-[150px]'>
                        <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                    </div>
                </div> */}
            </div>
            {/* our token */}
            <div className='flex flex-col gap-3 items-start  w-full '>
                <p>Our token</p>
                <div className='rounded-lg bg-[#152a3b]  border-dashed flex items-center justify-center  lg:w-[50%] w-full h-[150px]'>
                    <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                </div>

            </div>
            {/* our supply */}
            <div className='flex flex-col gap-3 items-start  w-full '>
                <p >Our supply</p>
                <div className='grid lg:grid-cols-2 gap-3 w-full text-white'>
                    <div className='rounded-lg bg-[#152a3b] px-6 p-3 border-dashed flex flex-col gap-3 justify-center items-start h-[150px]'>
                        <div className=' flex items-center justify-between w-full'>
                            <p className='text-xl'>Total suppy</p>
                            <p className='text-2xl'>{totalSupply}b</p>
                        </div>
                        <p className='text-sm text-[#14c2a3]'>ETH + BSC + POLYGON</p>
                    </div>
                    <div className='rounded-lg bg-[#152a3b] px-6 p-3 border-dashed flex flex-col gap-3 justify-center items-start h-[150px]'>
                        <div className=' flex items-center justify-between w-full'>
                            <p className='text-xl'>Bridge liquidity</p>
                            <p className='text-2xl'>$15k</p>
                        </div>
                        <p className='text-sm text-[#14c2a3]'>Locked supply</p>
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex items-center justify-center h-[200px]'>
                        <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex items-center justify-center h-[200px]'>
                        <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard