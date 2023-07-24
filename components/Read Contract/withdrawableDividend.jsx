import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";

export default function WithdrawableDividend() {
  const address = useAddress();
  const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
  const { data: balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "withdrawableDividendOf");

  useEffect(() => {
    const interval = setInterval(() => {
      refetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const refetchData = () => {
    refetchBalance();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{balance ? balance.toString() : 'N/A'}</div>;
}
