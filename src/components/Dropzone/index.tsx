import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './styles.module.scss';


export function Dropzone(){

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <section {...getRootProps()} className={styles.myDropZone}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Solte os arquivos aqui...</p> :
                <p>Arraste e solte os arquivos aqui, ou clique aqui para selecionar os arquivos</p>
            }
        </section>
    )
}