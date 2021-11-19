import { BarContainer } from "./barContainer";
import { Button } from "@mui/material";
import './sort.css'
import { useEffect, useState } from "react";
let totalArr = [];
let arr = [];
let shuffledArr = [];
const initialParameters = {paramArr:totalArr, colour:"black"};

export const Sort = () => {    

    useEffect (() => {
        console.log("hi page loaded");
        fetch('http://localhost:9000/api/numbers',{
            method: 'GET'
        })
        .then(response => response.json())        
        .then(data => totalArr = data.array[0])
        .then(() => console.log('frontend: ' , totalArr))
        }, [])    

    const [parameters, setParameters] = useState(
        initialParameters
    );

    const [visibility, setVisibility] = useState(false);

    const showData = (array) => {
        shuffledArr = array.sort(() => 0.5 - Math.random());
        arr = shuffledArr.slice(0,250);
        setVisibility(true);
        setParameters(...,{paramArr:arr, colour:'black'});
    }
    
    const hideData = () => {        
        setVisibility(false);
    }

    const bubbleSort = async (array) => {
        if(visibility){
            for(let i = 0; i < array.length; ++i){
                for(let j = 0; j < array.length-i-1; ++j){
                    setTimeout(() => {
                        if(array[j].value > array[j+1].value){
                            let temp = array[j].value;
                            array[j].value = array[j+1].value;
                            array[j+1].value = temp;
                            setParameters({paramArr:array, colour:'green'})
                        }else{
                            setParameters({paramArr:array, colour:'red'})
                        }
                    }, 20)
                }
            }
        }
    }

    return(

        <div className='sort' >
            
            <br/>

            <Button variant="outlined" onClick={() => bubbleSort(arr)} >
                Bubble
            </Button>

            <Button variant="outlined" onClick={() => showData(totalArr)} >
                Show Data
            </Button>

            <Button variant="outlined" onClick={hideData} >
                Hide Data
            </Button>

            <br/>
            <br/>
            {visibility ? <BarContainer paramArr={parameters}/> : null}

        </div>
    );    
}