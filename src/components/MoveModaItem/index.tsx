import React, { useState } from "react";
import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";


export function MoveModalItem(bucket: folderFileTypes) {
    return (
        <div className={styles.moveModalItem}>
            <button>
                <AiFillFolder size='2rem' color='var(--folder)'/>
                <p>{bucket.name}</p>
            </button>
        </div>
    )
}