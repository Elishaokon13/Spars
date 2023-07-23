import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import thunderBolt from '../../assets/thunder-bolt1.png'
import Image from 'next/image';

const GetAccountDividendInfo = () => {
  const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
  const { data: balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "withdrawableDividendOf")

  useEffect(() => {
    const interval = setInterval(() => {
      refetchData();
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const refetchData = () => { refetchBalance() }

  if (isLoading) {
    return <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />;
  }

  // Display the uint256 value from the balance array at index 3
  const uintValue = balance ? balance[3].toString() : 'N/A';

  return (
    <div>
      <span id='balance'>
        {uintValue} PARS
      </span>
    </div>
  );
}

export default GetAccountDividendInfo;
