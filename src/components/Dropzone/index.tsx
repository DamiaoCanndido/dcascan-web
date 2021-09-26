import {Dispatch, FunctionComponent, SetStateAction, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './styles.module.scss';


export const Dropzone: FunctionComponent<{setFile: Dispatch<SetStateAction<any[]>>}> = ({setFile}) => {

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles)
      }, [setFile])
      const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop, accept: 'application/pdf'})

    return (
        <section {...getRootProps()} className={styles.myDropZone}>
            <input {...getInputProps()} />
            {
                isDragReject ?
                <p>Somente arquivos pdf.</p> :
                <p>Arraste e solte os arquivos aqui, ou clique aqui para selecionar os arquivos</p>
            }
        </section>
    )
}