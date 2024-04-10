import './App.css'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState('')

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0])
      }
      catch (e) {
        console.log('error while fetching accounts', e)
      }
    }
    else {
      console.log('Please add web3 wallet')
    }
  }

  const getBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // const signer = provider.getSigner();
      // const address = await signer.getAddress();

      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    }
    catch (e) {
      console.log('Error while fetching balance')
    }
  }

  return (
    <div className='App'>
      <h1>Wallet Balance</h1>
      <button onClick={() => getBalance(address)}>get balance</button>
      <p>Your MetaMask balance: {balance} ETH</p>
    </div>
  );
};

export default App;