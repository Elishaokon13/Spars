import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import thunderBolt from '../../assets/thunder-bolt1.png'
import Image from 'next/image';

export default function WithdrawableDividend() {
    const address = useAddress();
    const { contract } = useContract("0x593649F70f836565e33f0BCe9af9503c243359B3");
    const { data: balance, refetch: refetchBalance, isLoading } = useContractRead(contract, "withdrawableDividendOf")

    useEffect(() => {
        setInterval(() => {
            refetchData();
        }, 10000);
    }, []);

    const refetchData = () => { refetchBalance() }

    if (isLoading) {
        return <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />;;
    }

    //const balance = data; 

    return <div>{balance ? balance.toString() : 'N/A'}</div>;
}