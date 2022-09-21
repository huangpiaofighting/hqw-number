import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Number from '@/Number';

function Test(){
    const [num,setNum] = useState('3');
    return <>
        <Number num={num} /> 
        <div onClick={()=>{
            setNum(`${Math.round(Math.random()*10)}`)
        }}>点击改变</div> 
    </>
}
 
ReactDOM.render(<Test />,document.getElementById("root"))