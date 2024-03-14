import React, { useState } from 'react'
import {load} from '@cashfreepayments/cashfree-js';
import axios from 'axios';

const Payment = () => {

    const [amount, setAmount] = useState(0);
    const [checked, setChecked] = useState(false);

    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "production"
        });
    };
    initializeSDK();    

    const handlePayment = async() => {
        try {
            if(!checked){ return alert("Agree Terms And Conditions") }
            const {data} = await axios.post('/api/v1/payment/session', {amount});
                doPayment(data?.response?.payment_session_id);
        } catch (error) {
            console.log(error);
        }
      };
    const doPayment = async (token) => {
        console.log(token);
        let checkoutOptions = {
            paymentSessionId: token,
            redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
    };

  return (
    <>
    <div className="payment">
        <div className="payment-container">
            <input type="Number"
                onChange={(e)=> setAmount(e.target.value)}
                className='payment-text'
                placeholder='Payment Amount'/>
            <div className="terms">
                <input type="checkbox" onClick={()=> setChecked(prev=>!prev)}/>
                <div>Terms & Conditions</div>
            </div>
            <button className={checked? 'navbar-pay' : 'navbar-pay desibled'} onClick={handlePayment}>pay</button>
        </div>
    </div>
    </>
  )
}

export default Payment
