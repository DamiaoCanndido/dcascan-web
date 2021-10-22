import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';

export function Dropdown() {

    const { user } = useContext(AuthContext);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <ul className={styles.dropDownMenu}>
            <li>
                <div onClick={handleClick}>
                    {user.username}
                    {click && <p>Sub-items</p>}
                </div>
            </li>
            <li>
                <div onClick={()=>{console.log("Example 1")}}>
                    Configurações
                </div>
            </li>
        </ul>
    )
}