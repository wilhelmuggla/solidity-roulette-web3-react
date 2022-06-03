import '@rainbow-me/rainbowkit/styles.css';

import './App.css';
import Wheel from './components/wheel'
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Container, Button, Grid, GridItem, InputGroup, InputRightAddon, Input, Text, Heading, extendTheme, } from '@chakra-ui/react'
import {
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useSigner,
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import contract from "./contracts/test.json";
import { ethers } from 'ethers'
import { BigNumber } from 'ethers';
import Confetti from 'react-confetti'
import UserMessages from './components/Message'
import form from './components/Form'
import Form from './components/Form';

function App(props) {
  const [betAmount, setBetAmount] = useState('');
  const { data: accountdata } = useAccount();
  const { data: signer, isError, isLoading } = useSigner()
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [errorMessage, setErrorMessage] = useState("");
  const [prizeNumber, setPrizeNumber] = useState();
  const [startSpinning, setStartSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const bet = (color) => {
    //reseting messages
    setErrorMessage("");
    setSuccessMessage("");

    //check if amount is found
    if (betAmount == '' || betAmount == undefined) {
      setErrorMessage('Please enter a bet amount');
      return;
    }

    //check if signer is found
    if (!signer) {
      setErrorMessage('No signer found');
      return;
    }
    setLoading(true);
    let erc20_contract = new ethers.Contract('0x2C935A1a8c30c2ACcFD3a0e9E72A89EDbaA15e0e', contract, signer);

    const options = { value: ethers.utils.parseEther(betAmount) }
    setLoadingMessage('Please confirm transaction in your wallet');
    erc20_contract.spin(color, options).then((transaction) => {
      setLoadingMessage('<a href="https://mumbai.polygonscan.com/address/' + transaction.hash + ' target="_blank">Transaction</a> is pending...');
      console.log(transaction);

      // Wait for one block confirmation. The transaction has been mined at this point.
      transaction.wait().then((minedTransaction) => {
        setLoadingMessage('Transaction mined in block number ' + minedTransaction.blockNumber + ' Wating for Spin result.');
        console.log(minedTransaction);
      })

    }).catch((e) => {
      setErrorMessage(e.data.message);
      setLoading(false);
    });


    erc20_contract.on("Result", (id, bet, amount, player, winColor, randomResult) => {
      setLoading(false);
      console.log(player, BigNumber.toNumber(randomResult), BigNumber.toNumber(amount), bet, winColor);
      setWinAmount(BigNumber.from(amount));
      setStartSpinning(true);
      setPrizeNumber(randomResult);

      if (bet == winColor)
        setSuccessMessage('Congratulations, you won ' + props.winAmount + ' ether!');

    });


  }

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: 'red',
        }
      })
    },
  })



  return (
    <RainbowKitProvider chains={props.chains} theme={lightTheme({
      accentColor: 'red',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
    })}>
      <ChakraProvider theme={theme}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          run={successMessage}
          recycle={false}
        />
        <Container maxW='xl' background="#fdffcd">
          <ConnectButton textAlign="center" />
        </Container>
        <Container maxW='xl' background="#fdffcd">
          {!accountdata.address ? <div className="overlay">Please Connect Wallet</div> : <></>}
          <UserMessages errorMessage={errorMessage} successMessage={successMessage} />
          <Heading textAlign="center">Web3 Roulette 🤑</Heading>
          <Wheel prizeNumber={prizeNumber} winAmount={winAmount} StartSpinning={startSpinning} loading={loading} loadingMessage={loadingMessage} />
          <Form loading={loading} bet={bet} betAmount={betAmount} setBetAmount={setBetAmount} />
        </Container>
      </ChakraProvider>
    </RainbowKitProvider>
  );
}

export default App;
