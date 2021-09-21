import { AiFillFolder } from "react-icons/ai";
import styles from './styles.module.scss';
import Link from 'next/link';
import { folderFileTypes } from "../../protocols/protocols";


export default function Folder(props: folderFileTypes){
    return (
        <div className={styles.folderContainer}>
            <Link href='#'>
                <a>
                    <AiFillFolder
                        size='5rem'
                        color='var(--folder)'
                    />
                    <p>{props.name}</p>
                </a>
            </Link>
        </div>
    )
}