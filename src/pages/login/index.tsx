import { FormEvent, useEffect, useState } from "react";
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
import Cookie from 'js-cookie';
import { errorToast } from "../../handlers/Toast";
import { destroyCookie, parseCookies } from "nookies";


const Login: NextPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const { login } = useContext(AuthContext);

  useEffect(() => {
    Cookie.remove('access-token');
    Cookie.remove('refresh-token');
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDisabled(true);

    if(email.trim() === ""){
        errorToast('E-mail em branco ou inválido.')
        setDisabled(false);
        return;
    }

    if(password.trim() === "" || password.trim().length < 6){
        errorToast('Senha curta.')
        setDisabled(false);
        return;
    }

    const res = await login({
      email: email.trim(), 
      password: password.trim(),
      rememberPassword
    }).catch(function(error){
      errorToast(error.response.data.errors.detail)
    })

    setDisabled(false);
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
            disabled={disabled}
          />

          <input 
            type="password" 
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={disabled}
          />

          <div className={styles.areaCheck}>
            <div className={styles.areaTitleCheck}>Lembrar senha</div>
            <input
              className={styles.checkInput}
              type="checkbox"
              disabled={disabled}
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
          </div>

          <Button type="submit" disabled={disabled}>
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

  try {
    const res = (await apiClient.get('auth/user')).status
    if (res === 200 || accessToken) {
      return {
        redirect: {
          destination: '/home',
          permanent: false
        }
      }
    }
  } catch (error) {
    destroyCookie(undefined, 'access-token')
  }
  
  return {
    props: {}
  }
}

export default Login