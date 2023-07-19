import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect} from 'react'
import { ethers } from "ethers";
function TotalPayout() {
    const address = useAddress(); 
    const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
    const { data:balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "getTotalDividendsDistributed",);

    useEffect(() => {
        setInterval(() => {
          refetchData();
        }, 10000);
      }, []);

      const refetchData = () => { refetchBalance()}
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return <div><span id='balance'>
    {balance && ethers.utils.formatEther(balance.toString())}
    </span></div>;
  }

  export default TotalPayout;