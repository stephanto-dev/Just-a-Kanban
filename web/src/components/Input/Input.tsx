import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, ...rest }) => {
  return(
    <div className={styles.inputWrapper}>
      <input className={styles.inputContainer} {...rest}/>
      {error && <p>{error.charAt(0).toUpperCase() + error.slice(1)}</p>}
    </div>
  )
}