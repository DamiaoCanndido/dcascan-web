import { FormEvent, useState } from "react";
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { errorToast, successToast } from "../../handlers/Toast";
import { Button } from '../../components/Button';
import { apiServerSide } from "../../services/apiServerSide";
import { parseCookies } from "nookies";
import { api } from '../../services/api';
import { returnAllErrors } from "../../handlers/errorRegisterHandlers";


const Register: NextPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disabled, setDisabled] = useState(false);


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDisabled(true);

    if(name.trim() === ""){
        errorToast('Nome em branco ou inválido.')
        setDisabled(false);
        return;
    }

    if(email.trim() === ""){
        errorToast('E-mail em branco ou inválido.')
        setDisabled(false);
        return;
    }

    if(password.trim() === ""){
        errorToast('Senha em branco ou inválido.')
        setDisabled(false);
        return;
    }

    if(repeatPassword.trim() === ""){
        errorToast('Senha em branco ou inválido.')
        setDisabled(false);
        return;
    }

    const res = await api.post('auth/register/', {
      username: name.trim(),
      email: email.trim(),
      password: password.trim(),
      confirm_password: repeatPassword.trim()
    }).catch(function(error){
      const registerErrors = returnAllErrors(error.response.data.errors)
      for(let i = 0; i < registerErrors.length; i++){
        errorToast(registerErrors[i][0])
      }
    })

    setDisabled(false);

    if (res) {
      successToast('Verifique seu e-mail.')
    }
  }

  

  return (
    <div className={styles.registerContainer}>
        <ToastContainer/>
        <Image
            src="/TomK32-Paperboat.svg"
            alt="DCAlogo"
            width={100}
            height={100}
        />
        <h2>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={disabled}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={disabled}
          />
          <input 
            type="password" 
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={disabled}
          />
          <input 
              type="password" 
              placeholder="Repetir senha"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              disabled={disabled}
          />
          <Button type="submit" disabled={disabled}>
              Criar Conta
          </Button>
        </form>
        <Link href='/login'>
          <a>
            <p>Já possui uma conta?</p>
          </a>
        </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = apiServerSide(ctx)

  const { ['access-token']: accessToken } = parseCookies(ctx)

  if (accessToken) {
    await apiClient.get('auth/user')
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }
  
  return {
    props: {}
  }
}

export default Register
