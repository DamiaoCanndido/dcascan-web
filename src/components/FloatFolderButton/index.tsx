import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";

type modalFunc = {
    modalFunc: () => void;
}

export function FloatFolderButton({modalFunc}: modalFunc) {

    return (
        <button onClick={modalFunc} className={styles.floatButton}>
            <AiFillFolder size={30} color='var(--white)'/>
        </button>
    )
}