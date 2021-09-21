import { AiFillFolder } from "react-icons/ai";
import styles from './styles.module.scss';
import { folderFileTypes } from "../../protocols/protocols";


export default function Folder(props: folderFileTypes){
    return (
        <div className={styles.folderContainer}>
            <div className={styles.iconFolder}>
                <AiFillFolder size='3rem' color='var(--folder)'/>
            </div>
            <div className={styles.textFolder}>
                <p>{props.name}</p>
            </div>    
        </div>
    )
}