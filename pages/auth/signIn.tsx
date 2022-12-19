import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

type Props = {};

//TODO: onSubmit & styling

export default function Signin({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    //handle submit
  };

  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        </div>
      </form>
    </div>
  );
}
