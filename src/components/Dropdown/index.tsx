import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import router from 'next/router';
import { destroyCookie } from 'nookies';

export function Dropdown() {

    const { user } = useContext(AuthContext);
    const [clickUser, setClickUser] = useState(false);
    const [clickSettings, setClickSettings] = useState(false);

    const handleClickUser = () => {
        setClickUser(!clickUser);
        setClickSettings(false);
    }

    const handleClickSettings = () => {
        setClickSettings(!clickSettings);
        setClickUser(false);
    }

    const logOut = () => {
        destroyCookie(undefined, 'access-token')
        destroyCookie(undefined, 'refresh-token')
        router.replace('login');
    }

    return (
        <ul className={styles.dropDownMenu}>
            <li className={styles.subItem}>
                <div className={styles.item} onClick={handleClickUser}>
                    {user.username}
                    {!clickUser ?
                        <AiFillCaretDown
                            color='var(--white)'
                            size={13}
                        /> :
                        <AiFillCaretUp
                            color='var(--white)'
                            size={13}
                        />
                    }
                </div>
            </li>
            {clickUser && 
                <>
                    <li onClick={() => {router.push('changepass')}}>
                        <div>
                            Trocar senha
                        </div>
                    </li>
                    <li onClick={logOut}>
                        <div>
                            Sair
                        </div>
                    </li>
                </>
            }
            <li className={styles.subItem}>
                <div className={styles.item} onClick={handleClickSettings}>
                    Configurações
                    {!clickSettings ?
                        <AiFillCaretDown
                            color='var(--white)'
                            size={13}
                        /> :
                        <AiFillCaretUp
                            color='var(--white)'
                            size={13}
                        />
                    }
                </div>
            </li>
            {clickSettings && 
                <li>
                    <div>
                        Em breve...
                    </div>
                </li>
            }
        </ul>
    )
}