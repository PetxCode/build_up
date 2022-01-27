import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const SignIn = () => {
  // const [saveUser, setSaveUser] = useState(null)

  const userModel = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(userModel),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await axios.post("http://localhost:3456/signIn", data);

    console.log(res.data.data);
    localStorage.setItem("user", JSON.stringify(res.data.data));
  });

  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Card onSubmit={onSubmit}>
            <Input placeholder="Enter your Email" {...register("email")} />
            <Input
              placeholder="Enter your Password"
              {...register("password")}
            />

            <Button type="submit">Sign In</Button>
          </Card>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default SignIn;

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
  margin: 20px 0;
`;

const Card = styled.form`
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
