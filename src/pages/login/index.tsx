import { FormEvent, useState } from "react";
import type { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


const Login: NextPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(email.trim() === ""){
        return;
    }

    if(password.trim() === ""){
        return;
    }

    await login({
      email: email.trim(), 
      password: password.trim()
    })
  }

  return (
    <div className={styles.loginContainer}>
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

export default Login