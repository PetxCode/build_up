import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate()
 const items = useSelector(state => state.reducer.cart)
 const itemsCost = useSelector(state => state.reducer.myTotal)
const [userInfo, setUserInfo] = useState(null)

useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("payer")))
}, [userInfo])
  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Card >
            <div>Thank you {userInfo?.name}, Here are a list of your Purchase:</div>

            <div>
                { items.map((props) => (
                    <div>
                        <div>{props.title}</div>
                        <div>{props.QTY}</div>
                    </div>
                ))}
            </div>

            <div>You'll get your items within the Next 48hrs</div>
            
            <Button onClick={() => {
                navigate("/")
          }}>Go back Home</Button>
          </Card>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default Success;

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
