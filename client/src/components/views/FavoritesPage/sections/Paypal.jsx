import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Paypal = ({ total, onSucPayCB, onCanPayCB, onErrPayCB, checkHasData }) => {    

    const onError = (err) => {      
        console.log("Error!", err);      
    };

    //AelMA7rUdxce2INjEX1y9KQ47L4J8Idv7rIROe3if2vnMqsIkIz5FFUvA5g-cZiRCnRl3X2EAZljDxWw --> 테스트2
    const client = {
        sandbox: 'AelMA7rUdxce2INjEX1y9KQ47L4J8Idv7rIROe3if2vnMqsIkIz5FFUvA5g-cZiRCnRl3X2EAZljDxWw',
        production: 'YOUR-PRODUCTION-APP-ID',
    };

    const env = 'sandbox'; // 테스트용, 진짜 쓰고 싶으면 'product'를 해야 한다
    const currency = 'USD'; 


    return (
        <div onClick={checkHasData}>
            <PaypalExpressBtn             
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSucPayCB} 
                onCancel={onCanPayCB}
                onErrPayCB={onErrPayCB} 
                style={{ 
                    size: 'large', 
                    color: 'blue',               
                    label: 'checkout'}} 
            />
        </div>        
    );
};

export default Paypal;