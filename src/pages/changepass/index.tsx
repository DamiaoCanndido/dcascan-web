import { FormEvent, useState, useContext } from "react";
import type { GetServerSideProps, NextPage } from 'next'
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../../components/Button';
import { apiServerSide } from "../../services/apiServerSide";
import { destroyCookie, parseCookies } from "nookies";
import { errorToast, successToast } from "../../handlers/Toast";
import { api } from "../../services/api";
import { returnAllErrors } from "../../handlers/errorRegisterHandlers";


const ChangePass: NextPage = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();

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
    const res = await api.post('auth/change-password/', {
      email: user.email,
      password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }).catch(function(error){
      if (error.response.data.errors.detail) {
        errorToast(error.response.data.errors.detail)
      } else {
        const registerErrors = returnAllErrors(error.response.data.errors)
        for(let i = 0; i < registerErrors.length; i++){
          errorToast(registerErrors[i][0])
        }
      }
    })

    setDisabled(false);

    if (res) {
      destroyCookie(undefined, 'access-token')
      destroyCookie(undefined, 'refresh-token')
      successToast("Senha alterada.")
      setTimeout(() => {router.replace('login')}, 1000)
    }
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