import type { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Button } from '../../components/Button';

const Register: NextPage = () => {
  return (
    <div className={styles.registerContainer}>
        <Image
            src="/TomK32-Paperboat.svg"
            alt="DCAlogo"
            width={100}
            height={100}
        />
        <h2>Crie sua conta</h2>
        <form onSubmit={()=>{}}>
          <input 
            type="text" 
            placeholder="Nome"
            onChange={() => {}}
            value={''}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            onChange={() => {}}
            value={''}
          />
          <input 
            type="password" 
            placeholder="Senha"
            onChange={()=>{}}
            value={''}
          />
          <input 
              type="password" 
              placeholder="Repetir senha"
              onChange={() => {}}
              value={''}
          />
          <Button type="submit">
              Criar Conta
          </Button>
        </form>
        <Link href='/'>
          <a>
            <p>Já possui uma conta?</p>
          </a>
        </Link>
    </div>
  )
}

export default Register