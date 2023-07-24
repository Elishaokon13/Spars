import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function WithdrawableDividend({ customAddress }) {
    const address = customAddress || useAddress();
    const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
    const { data: balance, refetch: refetchBalance, isLoading, error } = useContractRead(contract, "withdrawableDividendOf", [address]);

    useEffect(() => {
        const interval = setInterval(() => {
            refetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, [address, refetchData]);

    const refetchData = () => {
        refetchBalance();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <div>{balance ? balance.toString() : 'N/A'}</div>;
}
