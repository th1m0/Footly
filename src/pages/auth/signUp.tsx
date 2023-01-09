import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Props = {};

//TODO: onSubmit & styling

export default function Login({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    //handle submit
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("firstName")}
            placeholder="first Name"
            className=""
            type="text"
          />
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className=""
            type="text"
          />
        </div>
        <input
          {...register("email")}
          placeholder="Email"
          className=""
          type="email"
        />
        <input
          {...register("password")}
          placeholder="Password"
          className=""
          type="password"
        />
      </form>
    </div>
  );
}
