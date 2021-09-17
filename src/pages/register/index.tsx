import { FormEvent, useState } from "react";
import type { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';


const Register: NextPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(name.trim() === ""){
      return;
    }

    if(email.trim() === ""){
        return;
    }

    if(password.trim() === ""){
        return;
    }

    if(repeatPassword.trim() === ""){
        return;
    }
  }

  return (
    <div className={styles.registerContainer}>
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
          />
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
          <input 
              type="password" 
              placeholder="Repetir senha"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
          />
          <Button type="submit">
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

export default Register