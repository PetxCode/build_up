import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import px from "./22.jpg";
import axios from "axios";

const Registeration = () => {
  const [image, setImage] = useState(px);
  const [imageDB, setImageDB] = useState("");

  const userModel = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    confirm: yup.string().oneOf([yup.ref("password"), null]),
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setImageDB(file);
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(userModel),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { name, email, password } = data;

    const formData = new FormData();

    formData.append("userName", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", imageDB);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios.post("http://localhost:3456/register", formData, config);
  });

  return (
    <div>
      <Conatiner>
        <Wrapper>
          <Card onSubmit={onSubmit} type="multipart/form-data">
            <Image src={image} />
            <ImageLabel htmlFor="image">Please upload your Avatar</ImageLabel>
            <ImageInput
              id="image"
              type="file"
              accept="image/jpg, image/gif, image/png"
              onChange={uploadImage}
            />
            <Input placeholder="Enter your Name" {...register("name")} />
            <Input placeholder="Enter your Email" {...register("email")} />
            <Input
              placeholder="Enter your Password"
              {...register("password")}
            />
            <Input
              placeholder="Confirm your Password"
              {...register("confirm")}
            />
            <Button type="submit">Register</Button>
          </Card>
        </Wrapper>
      </Conatiner>
    </div>
  );
};

export default Registeration;

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
