import React from 'react';
import styles from './styles.module.scss';
import { api } from '../../services/api';

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
          <p>If when you try to use the website for the first time it takes a long time to respond or becomes very slow, it is because of the hosting. 
            The server is turned off when it is idle, so when you make the first request it will be turned on. But it may take some time. Therefore, I ask for your patience, thank you.</p>
        </div>
        <div className={styles.footer}>
          <button onClick={
            () => {
              setModal(false);
              api
                .get('/')
                .then((response) => {
                  alert(response.data.message);
                })
                .catch((error) => {
                  console.log(error);
                })
              }
            }>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;