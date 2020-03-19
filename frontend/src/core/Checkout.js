import React, {useState , useEffect} from 'react'
import Layout from "./Layout";
import {getProducts, getBraintreeClientToken, processPayment } from "./apiCore"
import { emptyCart } from './cartHelpers';
import Card from "./Card";
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";




const Checkout = ({ products }) =>{

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data =>{
            if(data.error){
                setData({...data, error: data.error})
            }else{
                setData({clientToken: data.clientToken});
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const getTotal = ()=>{

        return products.reduce((currentVlaue , nextValue) =>{


            return currentVlaue + nextValue.count * nextValue.price;

        },0);
    };

    const showCheckout = ()=>{

       return isAuthenticated()? (


            <div>{showDropIn()}</div>
                ): (
            
            <Link to= "/Signin">
                <button className = "btn btn-primary">
                            Sign in to Checkout
                    </button>
            
            </Link>
            
                );
    }

    const buy = () =>{
        //send the request payment method to server 
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data => {
            // console.log(data);
            nonce = data.nonce;
            //once you have nonce send nonce as paymentMethodNonce
            // console.log('send nonce and total to process: ',nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    setData({...data, success: response.success });
                    emptyCart(() => {
                        console.log('payment success and empty cart!')
                    })
                    //empty cart
                    //create order

                })
                .catch(error => console.log(error));
        })
        .catch(error => {
            // console.log('droping error: ', error);
            setData({...data, error: error.message});
        });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && products.length > 0 ? (
            <div>
                <DropIn options={{
                    authorization: data.clientToken
                }} onInstance={instance => (data.instance = instance)}/>
                <button onClick={buy} className="btn btn-success btn-block">Pay</button>
            </div>
        ) : null}
        
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );


    const showSuccess = success => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was Successful
        </div>
    );


    return(
        <div>
    <h2> Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )


}


export default Checkout;