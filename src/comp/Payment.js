import React from 'react';
import { usePaystackPayment } from 'react-paystack';



function App() {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_test_d632bf4b9aa1e74745eb158cec8034961dc13b18',
};

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log('closed')
}
const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Pay Now Now</button>
      </div>
    );
}

export default App;