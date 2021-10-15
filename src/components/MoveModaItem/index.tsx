import React, { useState } from "react";
import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";


export function MoveModalItem(bucket: folderFileTypes) {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className={styles.moveModalItem}>
            <button>
                <input
                    type="checkbox"
                    checked={isChecked}
                    id={bucket.id}
                    onChange={() => {
                        setIsChecked(!isChecked)
                    }}
                />
                <AiFillFolder size='2rem' color='var(--folder)'/>
                <p>{bucket.name}</p>
            </button>
        </div>
    )
}