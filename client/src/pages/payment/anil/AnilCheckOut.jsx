import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { AiOutlineClose } from "react-icons/ai";
import '../../../style/Payment.css'

const AnilCheckOut = () => {

  const params = useParams();
  const [paymetStatus, setPaymetStatus] = useState(false);

    const verifyPayment = async() => {
        try {
            const {data} = await axios.post('/api/v1/payment/verifying', {orderId: params?.id});
            if(data.success){
              setPaymetStatus(true)
            };
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(params?.id) verifyPayment();
    }, [params])

  return (
    <>
    <div className="anilcheckout">
      {paymetStatus ? <div className="anilcheckout-container">
        <div className="anilcheckout-success-icon"><AiOutlineClose/></div>
        <div className='anilcheckout-text'>Payment Success</div>
        <NavLink to='/'><button className='navbar-pay'>Go To HomePage</button></NavLink>
      </div> :
      <div className="anilcheckout-container">
        <div className="anilcheckout-failed-icon"><AiOutlineClose/></div>
        <div className='anilcheckout-text'>Payment Field</div>
        <NavLink to='/'><button className='navbar-pay'>Go To HomePage</button></NavLink>
      </div>}
    </div>
    </>
  )
}

export default AnilCheckOut
