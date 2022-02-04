import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import px from "./22.jpg";
import { useDispatch, useSelector } from "react-redux";
import { total } from "../eCommerce/globState";
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const  navigate = useNavigate()
    const dispatch = useDispatch()
  const [image, setImage] = useState(px);
  const [imageDB, setImageDB] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

 
const dataFile = useSelector(state => state.reducer.cart)
const totalCost = useSelector(state => state.reducer.myTotal)

const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: totalCost * 100,
    publicKey: 'pk_live_2732df7378e84dbe0013bb9fd7f00faad438e244',
};

const onSuccess = (reference) => {
  console.log(reference);
  navigate('/success')
};

const onClose = () => {
  console.log('closed')
}
const initializePayment = usePaystackPayment(config);

useEffect(() => {
dispatch(total())
}, [dataFile])
  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Card >
              <div>#{Math.ceil(totalCost)}</div>
            <Image src={image} />
            <ImageLabel htmlFor="image">Please upload your Avatar</ImageLabel>
           
            <Input placeholder="Enter your Name" value={name} onChange={(e) => {
                setName(e.target.value)
            }} />
            <Input placeholder="Enter your Email"  value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}  />
            
            <Button onClick={() => {
                localStorage.setItem('payer', JSON.stringify({name,email}))
              initializePayment(onSuccess, onClose)
          }}>Pay Now Now</Button>
          </Card>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default CheckOut;

const Button = styled.div`
  padding: 15px 40px;
  background: black;
  color: white;
  margin: 0 10px;
  transition: all 350ms;
  transform: scale(1);
  border: 0;
  outline: none;

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Input = styled.input`
  margin: 10px 0;
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  padding-left: 10px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const ImageLabel = styled.label`
  background: #004080;
  padding: 15px 40px;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  background: black;
  margin: 20px 0;
`;

const Card = styled.div`
  width: 500px;
  min-height: 200px;
  padding: 30px 0;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Conatiner = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
`;
