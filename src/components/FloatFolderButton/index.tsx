import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";


export function FloatFolderButton() {
    return (
        <button className={styles.floatButton}>
            <AiFillFolder size={30} color='var(--white)'/>
        </button>
    )
}