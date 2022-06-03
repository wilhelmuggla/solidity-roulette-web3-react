import React from "react"
import { Button, Grid, GridItem, InputGroup, InputRightAddon, Input, Text, } from '@chakra-ui/react'

export default (props) => {

    return (
        <Grid templateColumns='repeat(6, 6fr)' gap={4}>
            <GridItem colSpan={6} h='3'>
                <Text fontWeight="bold">1. Select amount</Text>
            </GridItem>
            <GridItem colSpan={6}>
                <InputGroup size='lg'>
                    <Input value={props.betAmount} disabled={props.loading} onChange={(e) => { props.setBetAmount(e.target.value) }} type="number" placeholder='amount' background="white" />
                    <InputRightAddon children='ether' />
                </InputGroup>
            </GridItem>
            <GridItem colSpan={6} h='3'>
            </GridItem>
            <GridItem colSpan={6} h='3'>
                <Text fontWeight="bold">2. Select color</Text>
            </GridItem>
            <GridItem colSpan={3}  >
                <Button width="100%" disabled={props.loading} onClick={() => { props.bet('red') }} colorScheme='red' size='lg'>Red</Button>
            </GridItem>
            <GridItem colStart={4} colEnd={7}>
                <Button disabled={props.loading} width="100%" onClick={() => { props.bet('black') }} colorScheme='black' background="black" size='lg'>Black</Button>
            </GridItem>
        </Grid>
    )
}