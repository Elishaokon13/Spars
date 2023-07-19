import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

export default function DividendTokenBalanceOf() {
    const address = useAddress();
    const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
    const { data, isLoading } = useContractRead(contract, "dividendTokenBalanceOf", [address])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    //const balance = data; 

    return <div>{data}</div>;
  }