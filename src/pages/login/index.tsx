import { FormEvent, useState } from "react";
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from '../../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { apiServerSide } from "../../services/apiServerSide";
import { parseCookies } from "nookies";
import { errorToast } from "../../handlers/Toast";


const Login: NextPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(email.trim() === ""){
        return;
    }

    if(password.trim() === "" || password.trim().length < 6){
        errorToast('Senha curta.')
        return;
    }

    const res = await login({
      email: email.trim(), 
      password: password.trim()
    }).catch(function(error){
      errorToast(error.response.data.errors.detail)
      // Tratar erros no backend
    })
  }

  return (
    <div className={styles.loginContainer}>
        <ToastContainer/>
        <Image
            src="/TomK32-Paperboat.svg"
            alt="DCAlogo"
            width={100}
            height={100}
        />
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input 
            type="password" 
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit">
              Entrar
          </Button>
        </form>
        <Link href='/register'>
          <a>
            <p>Ainda não possui uma conta?</p>
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

export default Login