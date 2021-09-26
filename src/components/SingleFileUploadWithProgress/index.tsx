import { useEffect } from "react"
import { api } from '../../services/api';

export type SingleFileUploadWithProgressProps = {
    file: File
}

export function SingleFileUploadWithProgress({file}: SingleFileUploadWithProgressProps){

    useEffect(() => {
        const uploadProcess = async (file: File) => {
            const data = new FormData()
            //const upfile = await api.post()
        }
        uploadProcess(file);
    }, [file])

    return (
        <div>SFU</div>
    )
}