import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import thunderBolt from '../assets/thunder-bolt1.png'
import Image from 'next/image';
// import contract from './contract';
// import { Button } from '@mui/material';

// newly added
import BalanceOf from './Read Contract/balance';
import DividendTokenBalanceOf from './Read Contract/dividendToken';
import DividendHolders from './Read Contract/dividendHolders';
import TotalPayout from './Read Contract/totalPayout'
import Claim from './Read Contract/claim';

const Dashboard = () => {
    const [totalSupply, setTotalSupply] = useState('');
    const [tokenBalance, setTokenBalance] = useState('');
    const [connectedAddress, setConnectedAddress] = useState('');
    const [liquidity, setLiquidity] = useState(null);
    const [tokenPrice, setTokenPrice] = useState(null);

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showClaimButton, setShowClaimButton] = useState(false);

    useEffect(() => {
        let countdownInterval;
    
        const startCountdown = () => {
          const countdownTime = 48 * 60 * 60; // 48 hours in seconds
          setTimeRemaining(countdownTime);
    
          countdownInterval = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
          }, 1000);
        };

        
    const handleRestartCountdown = () => {
        clearInterval(countdownInterval);
        setShowClaimButton(false);
        startCountdown();
      };
  
      startCountdown();
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, []);

    
  useEffect(() => {
    if (timeRemaining === 0) {
      setShowClaimButton(true);
      setTimeout(() => {
        setShowClaimButton(false);
        setTimeRemaining(48 * 60 * 60);
      }, 60 * 60 * 1000); // 1 hour in milliseconds
    }
  }, [timeRemaining]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.dexscreener.com/latest/dex/pairs/bsc/0x116916C283C5D70D6F6CF4faEb55740d09fFf191'
                );
                const { data } = response;
                const liquidityValue = data.pairs[0]?.liquidity?.usd || null;
                const tokenPriceValue = data.pairs[0]?.priceUsd || null;
                setLiquidity(liquidityValue);
                setTokenPrice(tokenPriceValue);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    const fetchTokenBalance = async (walletAddress, contractAddress, contractABI) => {
        try {
            // Create a new web3 instance
            const Web3 = require('web3');
            const web3 = new Web3(window.ethereum);

            // Create the contract instance
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            // Fetch token balance for the wallet address
            const balance = await contract.methods.balanceOf(walletAddress).call();

            // Set the token balance state
            setTokenBalance(balance);
        } catch (error) {
            console.error('Error fetching token balance:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if wallet is connected
                if (window.ethereum && window.ethereum.selectedAddress) {
                    const walletAddress = window.ethereum.selectedAddress;
                    setConnectedAddress(walletAddress);

                    const contractAddress = '0x593649F70f836565e33f0BCe9af9503c243359B3';
                    const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "holder", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Airdrop", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "EnableAccountStaking", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "enabled", "type": "bool" }], "name": "EnableStaking", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "enabled", "type": "bool" }], "name": "EnableSwapAndLiquify", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isExcluded", "type": "bool" }], "name": "ExcludeFromFees", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "oldValue", "type": "uint256" }], "name": "GasForProcessingUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "iterations", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "claims", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lastProcessedIndex", "type": "uint256" }, { "indexed": true, "internalType": "bool", "name": "automatic", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "gas", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "processor", "type": "address" }], "name": "ProcessedDividendTracker", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "opAmount", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "success", "type": "bool" }], "name": "SendDividends", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "value", "type": "bool" }], "name": "SetAutomatedMarketMakerPair", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "wallet", "type": "address" }], "name": "SetPreSaleWallet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokensSwapped", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "ethReceived", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "tokensIntoLiqudity", "type": "uint256" }], "name": "SwapAndLiquify", "type": "event" }, { "anonymous": false, "inputs": [], "name": "TradingEnabled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }], "name": "UpdateDividendTracker", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "sellDeadFees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sellMarketingFees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sellLiquidityFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sellRewardsFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buyDeadFees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buyMarketingFees", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buyLiquidityFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buyRewardsFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buyDevFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sellDevFee", "type": "uint256" }], "name": "UpdateFees", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }], "name": "UpdatePayoutToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "UpdateStakingAmounts", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "transferFee", "type": "uint256" }], "name": "UpdateTransferFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }], "name": "UpdateUniswapV2Router", "type": "event" }, { "inputs": [], "name": "DEAD", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "airdropWallets", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }], "name": "airdropToWallets", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "automatedMarketMakerPairs", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyDeadFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyDevFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyLiquidityFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyMarketingFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyRewardsFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "cooldowntimer", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devWallet", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "dividendTokenBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "dividendTracker", "outputs": [{ "internalType": "contract ParsDividendTracker", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "enable", "type": "bool" }], "name": "enableStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "enabled", "type": "bool" }], "name": "enableSwapAndLiquify", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "enableTrading", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "forceSwapAndSendDividends", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "gasForProcessing", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getAccountDividendsInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getAccountDividendsInfoAtIndex", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLastProcessedIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getNumberOfDividendTokenHolders", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPayoutToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getStakingInfo", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalDividendsDistributed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isExcludedFromAutoClaim", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isExcludedFromFees", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isReinvest", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "launchblock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "limitsInEffect", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "marketingWallet", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxWallet", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_contributors", "type": "address[]" }, { "internalType": "uint256[]", "name": "_balances", "type": "uint256[]" }], "name": "multiSend", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "gas", "type": "uint256" }], "name": "processDividendTracker", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sellAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellDeadFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellDevFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellLiquidityFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellMarketingFees", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellRewardsFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "allow", "type": "bool" }], "name": "setAllowAutoReinvest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "allow", "type": "bool" }], "name": "setAllowCustomTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "value", "type": "bool" }], "name": "setAutoClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "pair", "type": "address" }, { "internalType": "bool", "name": "value", "type": "bool" }], "name": "setAutomatedMarketMakerPair", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "wallet", "type": "address" }, { "internalType": "bool", "name": "enable", "type": "bool" }], "name": "setCanTransferBefore", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "value", "type": "bool" }], "name": "setDividendsPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "setExcludeDividends", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "bool", "name": "excluded", "type": "bool" }], "name": "setExcludeFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "GWEI", "type": "uint256" }], "name": "setGasPriceLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "setIncludeDividends", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "value", "type": "bool" }], "name": "setLimitsInEffect", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setMinimumTokenBalanceForAutoDividends", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setMinimumTokenBalanceForDividends", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "wallet", "type": "address" }], "name": "setPresaleWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "value", "type": "bool" }], "name": "setReinvest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setSwapTriggerAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setcooldowntimer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setmaxWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakingAmounts", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "stakingBonus", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "stakingUntilDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapAndLiquifyEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapTokensAtAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tradingEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswapV2Pair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uniswapV2Router", "outputs": [{ "internalType": "contract IUniswapV2Router02", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "deadBuy", "type": "uint256" }, { "internalType": "uint256", "name": "deadSell", "type": "uint256" }, { "internalType": "uint256", "name": "marketingBuy", "type": "uint256" }, { "internalType": "uint256", "name": "marketingSell", "type": "uint256" }, { "internalType": "uint256", "name": "liquidityBuy", "type": "uint256" }, { "internalType": "uint256", "name": "liquiditySell", "type": "uint256" }, { "internalType": "uint256", "name": "RewardsBuy", "type": "uint256" }, { "internalType": "uint256", "name": "RewardsSell", "type": "uint256" }, { "internalType": "uint256", "name": "devBuy", "type": "uint256" }, { "internalType": "uint256", "name": "devSell", "type": "uint256" }], "name": "updateFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newValue", "type": "uint256" }], "name": "updateGasForProcessing", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "updatePayoutToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "bonus", "type": "uint256" }], "name": "updateStakingAmounts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newTransferFee", "type": "uint256" }], "name": "updateTransferFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "withdrawableDividendOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];

                    fetchTokenBalance(walletAddress, contractAddress, contractABI);
                }
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };

        fetchData();
    }, []);

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
            {/* our supply */}
            <div className='flex flex-col gap-3 items-start  w-full '>
                <p >Our supply</p>
                <div className='grid lg:grid-cols-2 gap-3 w-full text-white'>
                    <div className='rounded-lg bg-[#152a3b] px-6 p-3 border-dashed flex flex-col gap-3 justify-center items-start h-[150px]'>
                        <div className=' flex items-center justify-between w-full'>
                            <p className='text-xl'>Total supply</p>
                            <p className='text-2xl'>{totalSupply}B</p>
                        </div>
                        <p className='text-sm text-[#14c2a3]'>BSC</p>
                    </div>
                    <div className='rounded-lg bg-[#152a3b] px-6 p-3 border-dashed flex flex-col gap-3 justify-center items-start h-[150px]'>
                        <div className=' flex items-center justify-between w-full'>
                            <p className='text-xl'>Bridge liquidity</p>
                            {liquidity !== null ? (
                                <p className='text-2xl'>${liquidity}</p>
                            ) : (
                                <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                            )}
                        </div>
                        <p className='text-sm text-[#14c2a3]'>Locked supply</p>
                    </div>
                </div>
            </div>
            {/* our token */}
            <div className='flex flex-col gap-2 items-start  w-full '>
                <p >Our supply</p>
                <div className='grid lg:grid-cols-3 gap-3 w-full text-white'>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Token Price</p>
                        {tokenPrice !== null ? (
                            <p className='text-2xl text-[#14c2a3]'>${tokenPrice}</p>
                        ) : (
                            <Image className='object-cover thunder-bolt' alt='img' src={thunderBolt} />
                        )}
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Claim Rewards(48hours)</p>
                        
                        {showClaimButton && (
                            <Claim/>
                        )}
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Your Dividend holdings </p>
                        
                        <BalanceOf/>
                        
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Next Payout</p>
                        <div>{formatTime(timeRemaining)}</div>                      
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Dividend holders</p>
                        <DividendHolders/>
                    </div>
                    <div className='rounded-lg bg-[#152a3b]  border-dashed flex flex-col gap-3 items-center justify-center h-[200px]'>
                        <p className='text-xl'>Total BNB Paid</p>
                        <TotalPayout />
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default Dashboard
