import React from "react";
import { Wheel } from 'react-custom-roulette'
import { extendTheme, Spinner } from '@chakra-ui/react'




export default ((props) => {

    //first slot always green
    const data = [{ option: '0', style: { backgroundColor: 'green' } }]

    //create the wheel
    for (let i = 1; i <= 18; i++) {
        data.push({ option: i, style: { backgroundColor: 'red' } });
        data.push({ option: i + 2, style: { backgroundColor: 'black' } });
    }


    //if loading
    if (props.loading)
        return (
            <div className="spinnerContainer">< Spinner color="red" thickness='7px' size='xl' />
                <br />
                <br />
                {props.loadingMessage}
            </div >)
    //else display wheel
    else return (
        <Wheel
            mustStartSpinning={props.StartSpinning}
            prizeNumber={props.prizeNumber}
            data={data}
            backgroundColors={['#3e3e3e', '#df3428']}
            textColors={['#ffffff']}
            innerRadius="10"
            outerBorderWidth="10"
            innerBorderWidth="10"
            onStopSpinning={
                () => {
                    if(props.winAmount > 0)
                        alert('You won '+ props.winAmount + ' !!!!');
                    else {
                        alert('You lost :(');
                    }
                }
            }
            />
    )


});