import { folderFileTypes } from "../../protocols/protocols";
import style from './styles.module.scss';
import Link from 'next/link';
import { AiFillFilePdf } from "react-icons/ai";

export default function File(props: folderFileTypes){
    return (
        <div className={style.fileContainer}>
            <Link href='#'>
                <a>
                    <AiFillFilePdf
                        size='5rem'
                        color='var(--pdf)'
                    />
                    <p>{props.name}</p>
                </a>
            </Link>
        </div>
    )
}