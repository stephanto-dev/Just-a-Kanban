import { Input } from '../../components/Input/Input';
import styles from './styles.module.scss';
import { Kanban } from 'phosphor-react';
import {useState} from 'react';
import {useTypewriter} from 'react-simple-typewriter';


export default function LoginPage(){

  const [signIn, setSignIn] = useState(true);
  const [text] = useTypewriter({
    words: ['yourself', 'your projects', 'your life'],
    loop: 500,
  });

  return(
    <div className={styles.wrapper}>
      
      <div className={styles.title}>
        <p>WELCOME TO</p>
        <p>JUST A KANBAN</p>
        <p>Organize <span>{text}</span> <br /> in a simple way.</p>
      </div>

      <div className={styles.test}>


      {signIn ? 
      <div className={styles.formWrapper}>
          <Kanban size={64}/>
        <form className={styles.form}>
          <div className={styles.input}>
            <Input 
              placeholder='E-mail' 
              type='email'
            />
          </div>
            <div className={styles.input}>
              <Input
                type='password'
                placeholder='Password'
              />
            </div>

          <div className={styles.register}>
            <p>Don't have an account?</p>
            <button type='button' onClick={() => setSignIn(!signIn)}>Register</button>
          </div>

          <button type='submit' className={styles.button}>Login</button>
        </form>

      </div>

      :
      <div className={styles.formWrapper}>
          <Kanban size={64}/>
        <form className={styles.form}>
          <div className={styles.input}>
            <Input 
              placeholder='Name' 
              type='text'
            />
          </div>
          <div className={styles.input}>
            <Input 
              placeholder='E-mail' 
              type='email'
            />
          </div>
            <div className={styles.input}>
              <Input
                type='password'
                placeholder='Password'
              />
            </div>

            <div className={styles.input}>
              <Input
                type='password'
                placeholder='Repeat password'
              />
            </div>

            <div className={styles.login}>
            <p>Already have an account?</p>
            <button type='button' onClick={() => setSignIn(!signIn)}>Login</button>
        </div>

          <button type='submit' className={styles.button}>Register</button>
        </form>

        
      </div>
    } 
      
      </div>

    </div>
  )
}