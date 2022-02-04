import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../comp/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, addToCart } from "../eCommerce/globState";
import {collection, deleteDoc, doc, getDoc, onSnapshot} from "firebase/firestore"
import {db} from "../base"


const StoreScreen = () => {
  const { saveUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  // const myData = useSelector((state) => state.reducer.product);
  const [myData, setMyData] =useState([]);




  const getFetchData = async() => {
    const user = collection(db, "admission2022")
    onSnapshot(user, snap => {
      const r = []
      snap.forEach(doc => {
        r.push({...doc.data(), id: doc.id})
      })
      setMyData(r)
    })
  }


  const deleteUser = async (id) => {
    const user = collection(db, "admission2022")
    const userDoc = doc(user, id)
    deleteDoc(userDoc)
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Welcome>
            Welcome back <span>{myData.length}</span>
          </Welcome>
          <Card>
            {myData.map((props) => (
              <Holder key={props.id}>
                <Image src={props.avatar} />

                <Div>
                  <TitleHolder>
                  <Price>{props.name}</Price>
                    <Title>#{props.address}</Title>
                    <Space/>
                    <Title>
                      <strong>{props.phone}</strong>
                    </Title>
                    
                  </TitleHolder>
                  <Button
                    onClick={() => {
                      
                    }}
                  >
                    Delete
                  </Button>
                </Div>
              </Holder>
            ))}
          </Card>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default StoreScreen;

const Space = styled.div`
margin-top: 20px
`

const Price = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
`;
const TitleHolder = styled.div`
  width: 160px;
  margin-left: 10px;
`;
const Title = styled.div`
  font-size: 12px;
`;

const Welcome = styled.div`
  margin-bottom: 50px;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
`;

const Holder = styled.div`
  margin: 30px;
  width: 300px;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 5px;
`;
const Button = styled.button`
  padding: 15px 20px;
  border-radius: 3px;
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
  margin-top: -20px;
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Conatiner = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
`;
