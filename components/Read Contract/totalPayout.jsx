import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

function TotalPayout() {
  const address = useAddress(); 
  const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
  const { data: balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "getTotalDividendsDistributed");

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchData();
    }, 10000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const refetchData = () => {
    refetchBalance();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formattedBalance = balance ? Number(ethers.utils.formatEther(balance.toString())).toFixed(2) : "N/A";

  return (
    <div>
      <span id='balance'>
        {formattedBalance}
      </span>
    </div>
  );
}

export default TotalPayout;
