import { folderFileTypes } from "../../protocols/protocols";
import styles from './styles.module.scss';
import { AiFillFilePdf } from "react-icons/ai";


export default function File(props: folderFileTypes){
    return (
        <div className={styles.fileContainer}>
            <div className={styles.iconFile}>
                <AiFillFilePdf size='3rem' color='var(--pdf)'/>
            </div>
            <div className={styles.textFile}>
                <p>{props.name}</p>
            </div> 
        </div>
    )
}