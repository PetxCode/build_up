import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useParams } from "react-router-dom";

const DetailScreen = () => {
  const { id } = useParams();
  console.log(id);
  const { saveUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);

  const [name, setName] = useState("");

  const editUser = async () => {
    console.log(name);

    const config = {
      headers: {
        authorization: `CodeLab Trainning ${saveUser?.token}`,
      },
    };

    const res = await axios.patch(
      `http://localhost:3456/user/${id}`,
      { userName: name },
      config
    );

    console.log("Update Done", res);
    return res;
  };

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3456/users/${id}`);

    setAllUsers(res.data.data);

    console.log(res.data.data);
  };

  useEffect(() => {
    fetchData();
    editUser();
  }, []);

  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Welcome>
            Welcome back <span>{saveUser?.userName}</span>
          </Welcome>
          <Card>
            <Holder>
              <Image src={`http://localhost:3456/${allUsers.avatar}`} />
              <div>{allUsers.userName}</div>
            </Holder>
          </Card>

          <Input
            placeholder="userName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={editUser}>Edit</Button>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default DetailScreen;

const Welcome = styled.div`
  margin-bottom: 50px;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;
const Holder = styled.div`
  margin: 30px;
  width: 300px;
  min-height: 100px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
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
  margin-top: -20px;
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Conatiner = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
`;
