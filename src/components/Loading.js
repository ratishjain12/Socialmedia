import React from 'react';
import ReactLoading from 'react-loading';
 import './Loading.css'

const Loading = ({ type, color }) => (
    <div className='loading'>
        <ReactLoading className='loader' type={type} color={color} height={50} width={50}/>
    </div>
    
);
 
export default Loading;