import '@rainbow-me/rainbowkit/styles.css';

import './App.css';
import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Container, Button, FormLabel, Grid, GridItem, InputGroup, InputRightAddon, Input, Text, Heading, extendTheme } from '@chakra-ui/react'
import { Wheel } from 'react-custom-roulette'
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  useContractWrite,
  useAccount,
  useSigner,
  useContractRead
} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import contract from "./contracts/test.json";
import { getDefaultProvider, ethers } from 'ethers'
import { Signer } from 'ethers';

const data = [
  { option: '', style: { backgroundColor: 'green' } },
]
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: 'red',
      }
    })
  },
})

for (let i = 0; i <= 35; i++) {
  data.push({ option: '' });
}



console.log(data);

function App(props) {
  const [account, setAccount] = useState();
  const [betAmount, setBetAmount] = useState();
  const { data: accountdata } = useAccount();
  const { data: signer, isError, isLoading } = useSigner()

  const bet = (color) => {
    if (betAmount == '' || betAmount == undefined)
      return (0);


    if (!signer)
      return 0;

    let erc20_rw = new ethers.Contract('0x2C935A1a8c30c2ACcFD3a0e9E72A89EDbaA15e0e', contract, signer);

    const options = { value: ethers.utils.parseEther(betAmount) }

    erc20_rw.spin(color, options).then((result) => {
      console.log(result);
      // Wait for one block confirmation. The transaction has been mined at this point.
      result.wait().then((receipt) => {
        console.log(receipt);

      })

    }).catch((e) => {
      alert(e.data.message);
    });


    erc20_rw.on("Result", (id, bet, amount, player, winColor, randomResult) => {
      console.log(id, bet, winColor);
    });


  }



  return (
    <RainbowKitProvider chains={props.chains} theme={lightTheme({
      accentColor: 'red',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
    })}>
      <ChakraProvider theme={theme}>
        <Container maxW='xl' background="#fdffcd">
          <ConnectButton textAlign="center" />
        </Container>
        <Container maxW='xl' background="#fdffcd">
          {!accountdata ?
            <div className="overlay">Please Connect Wallet</div> : <></>}
          <Heading textAlign="center">Web3 Roulette 🤑</Heading>
          <Wheel
            mustStartSpinning={true}
            prizeNumber={0}
            data={data}
            backgroundColors={['#3e3e3e', '#df3428']}
            textColors={['#ffffff']}
            innerRadius="10"
            outerBorderWidth="10"
            innerBorderWidth="10"
          />
          <Grid templateColumns='repeat(6, 6fr)' gap={4}>
            <GridItem colSpan={6} h='3'>
              <Text fontWeight="bold">1. Select amount</Text>
            </GridItem>
            <GridItem colSpan={6}>
              <InputGroup size='lg'>
                <Input value={betAmount} onChange={(e) => { setBetAmount(e.target.value) }} type="number" placeholder='amount' background="white" />
                <InputRightAddon children='ether' />
              </InputGroup>
            </GridItem>
            <GridItem colSpan={6} h='3'>
            </GridItem>
            <GridItem colSpan={6} h='3'>
              <Text fontWeight="bold">2. Select color</Text>
            </GridItem>
            <GridItem colSpan={3} h='3' bg='tomato' >
              <Button width="100%" onClick={() => { bet('red') }} colorScheme='red' size='lg'>Red</Button>
            </GridItem>
            <GridItem colStart={4} colEnd={7} h='10' bg='papayawhip'>
              <Button width="100%" onClick={() => { bet('black') }} colorScheme='black' background="black" size='lg'>Black</Button>
            </GridItem>


          </Grid>
        </Container>
      </ChakraProvider>
    </RainbowKitProvider>
  );
}

export default App;
