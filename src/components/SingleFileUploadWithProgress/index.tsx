import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export type SingleFileUploadWithProgressProps = {
    file: File
}

export function SingleFileUploadWithProgress({file}: SingleFileUploadWithProgressProps){

    const [progress, setProgress] = useState(0);
    const router = useRouter()

    useEffect(() => {

        const uploadProcess = async (file: File) => {
            const data = new FormData()
            data.append('file', file)
            const folder = router.query.uuid as string;
            if (folder !== undefined) {
                data.append('folder', folder)
            }
            await api.post(
              'uploads/', 
              data, {
                onUploadProgress: (e) => {
                  const calcProgress = Math.round((e.loaded)*100/e.total)
                  setProgress(calcProgress)
                }
              }).catch(function(error){
                  console.log(error)
              })
            // if (folder !== undefined) {
            //   await api.get(`bucket/${folder}`)
            // } else {
            //   await api.get('bucket/')
            // }
        }
        uploadProcess(file);

    }, [file, router.query.uuid])

    return (
        <div className={styles.myProgressBar}>
            <p>{file.name}</p>
            <CircularProgressbar className={styles.circular} value={progress} text={`${progress}%`}/>
        </div>
    )
}

