import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import thunderBolt from '../../assets/thunder-bolt1.png'
import Image from 'next/image';

export default function DividendHolders() {
  const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
  const { data: balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "getNumberOfDividendTokenHolders")

  useEffect(() => {
    setInterval(() => {
      refetchData();
    }, 10000);
  }, []);

  const refetchData = () => { refetchBalance() }

  if (isLoading) {
    return <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />;
  }

  return <div><span id='balance'>
    {balance ? balance.toString() : 'N/A'}
  Holders </span></div>;

}