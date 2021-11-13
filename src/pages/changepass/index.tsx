import { FormEvent, useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button } from '../../components/Button';
import { apiServerSide } from "../../services/apiServerSide";
import { destroyCookie, parseCookies } from "nookies";
import { errorToast } from "../../handlers/Toast";


const ChangePass: NextPage = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDisabled(true);

    if(oldPassword.trim() === ""){
        errorToast('Senha em branco ou inválido.')
        setDisabled(false);
        return;
    }

    if(newPassword.trim() === "" || confirmPassword.trim().length < 6){
        errorToast('Senha diferentes ou em branco.')
        setDisabled(false);
        return;
    }

    // requisição.

    setDisabled(false);
  }

  return (
    <div className={styles.changePassContainer}>
        <ToastContainer/>
        <h2>Mudar senha</h2>
        <form onSubmit={handleSubmit}>

            <input 
                type="password" 
                placeholder="Senha antiga"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                disabled={disabled}
            />

            <input 
                type="password" 
                placeholder="Nova senha"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                disabled={disabled}
            />

            <input 
                type="password" 
                placeholder="Confirme senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                disabled={disabled}
            />

          <Button type="submit" disabled={disabled}>
              Mudar
          </Button>
        </form>
        
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = apiServerSide(ctx)

  const { ['access-token']: accessToken } = parseCookies(ctx)

  try {
    (await apiClient.get('auth/user')).status
  } catch (error) {
    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    } 
  }
  
  return {
    props: {}
  }
}

export default ChangePass;