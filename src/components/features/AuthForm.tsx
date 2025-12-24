import React from 'react'
import {useForm} from 'react-hook-form'
import type { AuthFormInputs } from '../../types/authData';
type AuthType = 'login' | 'register';


interface AuthFormProps {
  mode: AuthType;
  sendData: (data: AuthFormInputs) => void;
}

const AuthForm = ({ mode,sendData }: AuthFormProps) => {
 const {register, handleSubmit, formState: {errors}}= useForm<AuthFormInputs>()

  const onSubmit = (data: AuthFormInputs) => {
    sendData(data);
    console.log(data)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {mode==='register' && (
        <input type="text" placeholder="Name" {...register("name", { required: true })} />
      )}
      <input type="email" placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password", { required: true })} />
      <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
    </form>
  )
}


export default AuthForm