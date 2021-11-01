import styles from './styles.module.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export type UploadErrorProps = {
    file: File
}

export function UploadError({file}: UploadErrorProps){
    return (
        <div className={styles.myUploadError}>
            <p>{file.name}</p>
            <CircularProgressbar className={styles.circular} value={0} text={'0%'}/>
        </div>
    )
}