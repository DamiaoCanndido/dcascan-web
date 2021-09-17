import { ButtonHTMLAttributes } from "react";

import styles from './styles.module.scss';

type ButtonPress = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonPress) {
    return (
        <button className={styles.buttonContainer} {...props} />
    );
}