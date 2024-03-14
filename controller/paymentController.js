import { Cashfree } from "cashfree-pg"; 
import dotenv from "dotenv";

dotenv.config();

Cashfree.XClientId = process.env.cashfree_api_key;
Cashfree.XClientSecret = process.env.cashfree_secret_key;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// ********** CODER ANIL
//********************/   Create Token coder anil   /********************//
export const createPaymentSeccion = async(req, res) => {
    const {amount} = req.body;
    const orderId = String(Math.random()).split('.')[1] + Date.now();
    
    var request = {
        "order_amount": amount,
        "order_currency": "INR",
        "order_id": orderId,
        "customer_details": {"customer_id": "walterwNrcMi", "customer_phone": "8474090589"},
        "order_meta": { "return_url": `https://coderanil.vercel.app/checkout/${orderId}`}
    };

    try {
        // Create Token
        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
            console.log('Order created successfully:',response.data);
            res.status(200).send({
                success: true,
                response: response.data,
            })
        }).catch((error) => {
            console.error('Error:', error.response.data.message);
            res.status(500).send({
                success: false,
                error,
            })
        });
    } catch (error) {
        console.log(error)
    }
}

//********************/   Verify Payment   /********************//
export const verifyPaymentAnil = async(req, res) => {
    const {orderId} = req.body;
    try {
        await Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            let paymentStatus = response.data[0]?.payment_status;
            if(paymentStatus === "SUCCESS"){
                res.status(200).send({
                    success: true,
                })
            }else{
                res.status(400).send({
                    success: false,
                })
            }
        }).catch((error) => {
            console.log(error)
            res.status(500).send({
                success: false
            })
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
        })
    }
}



// **************   AVANSHIKA
//********************/   Create Token avanshika   /********************//
export const createPaymentAvanshikaSeccion = async(req, res) => {
    const {plan} = req.body;
    const orderId = String(Math.random()).split('.')[1] + Date.now();
    const amount = 0;
    // if(plan === 1){
    //     amount == 149 ;
    // }else{
    //     amount == 1499 ;
    // }
    
    var request = {
        "order_amount": amount,
        "order_currency": "INR",
        "order_id": orderId,
        "customer_details": {"customer_id": "walterwNrcMi", "customer_phone": "8474090589"},
        "order_meta": {
            "return_url": `https://avanshika.onrender.com/avanshika/checkout/${orderId}`
        }
    };

    try {
        // Create Token
        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
            console.log('Order created successfully:',response.data);
            res.status(200).send({
                success: true,
                response: response.data,
            })
        }).catch((error) => {
            console.error('Error:', error.response.data.message);
            res.status(500).send({
                success: false,
                error,
            })
        });
    } catch (error) {
        console.log(error)
    }
}


//********************/   Verify Payment   /********************//
export const verifyPayment = async(req, res) => {
    const {orderId, orderNo} = req.body;
    try {
        await Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            let paymentStatus = response.data[0]?.payment_status;
            if(paymentStatus === "SUCCESS"){
                res.status(200).send({
                    success: true,
                    orderNo: (parseInt(orderNo)+1),
                    callLink: "fjkebfgijgh87rteirughirjgbdhrgijb",
                })
            }else{
                res.status(400).send({
                    success: false,
                })
            }
        }).catch((error) => {
            console.error('Error:', error.response.data.message);
        });
        
    } catch (error) {
        console.log(error);
    }
}