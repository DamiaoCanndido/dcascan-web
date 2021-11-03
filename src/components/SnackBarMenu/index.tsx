import { FormEvent } from "react"
import styles from './styles.module.scss';

type snackBarFunc = {
    modalFunc: () => void;
    id: string;
    name: string;
}

export function SnackBarMenu({
    modalFunc = () => {}, 
    id = 'snackModal', 
    name,
}: snackBarFunc) {

    function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id){ 
            modalFunc() 
        }
    }

    return (
        <div id={id} className={styles.snackBarShadow} onClick={handleOutSideClick}>
            <div className={styles.snackContainer}>

            </div>
        </div>
    )
}