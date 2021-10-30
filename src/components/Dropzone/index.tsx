import {useCallback, useState} from 'react'
import {FileError, FileRejection, useDropzone} from 'react-dropzone'
import { SingleFileUploadWithProgress } from '../SingleFileUploadWithProgress';
import styles from './styles.module.scss';


type uploadbleFiles = {
    file: File
    errors: FileError[]
}


export const Dropzone = () => {

    const [files, setFiles] = useState<uploadbleFiles[]>([])

    const onDrop = useCallback((acceptedFiles: File[], rejectFiles: FileRejection[]) => {
        const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }))
        setFiles((curr) => [...curr, ...mappedAcc, ...rejectFiles])
      }, [setFiles])

      const {getRootProps, getInputProps, isDragReject } = useDropzone({onDrop, accept: 'application/pdf'})

    return (
        <>
            <section {...getRootProps()} className={styles.myDropZone}>
                <input {...getInputProps()} />
                {
                    isDragReject ?
                    <p>Somente arquivos pdf.</p> :
                    <p>Arraste e solte os arquivos aqui, ou clique aqui para selecionar os arquivos</p>
                }
            </section>
            {files.length > 0 &&
                <div className={styles.myUploads}>
                    <button onClick={() => setFiles([])}>x</button>
                </div>  
            }
            {files.map((fileWrapper, index) => (   
                <SingleFileUploadWithProgress file={fileWrapper.file} key={index}/>   
            ))}
        </>
    )
}