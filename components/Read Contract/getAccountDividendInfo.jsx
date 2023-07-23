import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import thunderBolt from '../../assets/thunder-bolt1.png';
import Image from 'next/image';

const GetWithdrawableDividend = () => {
  const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
  const { data: withdrawableDividend, isLoading } = useContractRead(contract, "withdrawableDividendOf");

  if (isLoading) {
    return <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />;
  }

  // Display the uint256 value from the withdrawableDividend
  const withdrawableDividendValue = withdrawableDividend ? withdrawableDividend.toString() : 'N/A';

  return (
    <div>
      <span id='withdrawableDividend'>
        {withdrawableDividendValue} PARS
      </span>
    </div>
  );
}

export default GetWithdrawableDividend;
