import React from "react";
import {  Alert, AlertIcon, Box, AlertDescription } from '@chakra-ui/react'



export default (props) => {

    if (props.errorMessage)
        return (
            <Alert status='error'>
                <AlertIcon />
                <Box>
                    <AlertDescription>
                        {props.errorMessage}
                    </AlertDescription>
                </Box>
            </Alert>
        )

    if (props.successMessage)
        return (
            <Alert status='success'>
                <AlertIcon />
                <Box>
                    <AlertDescription>
                        {props.successMessage}
                    </AlertDescription>
                </Box>
            </Alert>
        ) 

}