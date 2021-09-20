import Link from 'next/link';
import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";

export default function Folder() {
    return (
        <div className={styles.folderContainer}>
            <Link href='#'>
                <a>
                    <div>
                        <AiFillFolder 
                            size={75}
                            color='var(--green-500)'
                        /> 
                        <p>Nome da pasta</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}