import React from 'react';
import styles from './styles.module.scss';

type ModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({setModal}:ModalProps) {
  return(
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>A little warning!</h1>
        </div>
        <div className={styles.body}>
          <p>
          If when you try to use the website for the first time it takes a long time to respond or becomes very slow, it is because of the hosting. 
          The server is turned off when it is idle, so when you make the first request it will be turned on. But it may take some time (2 minutes on average). 
          You will receive a notification when the server connects. 
          Therefore, I ask for your patience, thank you.
          </p>
        </div>
        <div className={styles.footer}>
          <button onClick={
            () => {
              setModal(false);
              }
            }>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;