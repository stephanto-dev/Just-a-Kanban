import { Input } from '../../components/Input/Input';
import styles from './styles.module.scss';
import { Kanban } from 'phosphor-react';
import {useContext, useEffect, useState} from 'react';
import {useTypewriter} from 'react-simple-typewriter';
import { api } from '../../services/api';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/AuthContext';
import Modal from '../../components/Modal/Modal';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  username: Yup.string().required()
});

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});


export default function LoginPage(){
  const {login} = useContext(AuthContext);
  
  const [signIn, setSignIn] = useState(true);
  const [text] = useTypewriter({
    words: ['yourself', 'your projects', 'your life'],
    loop: 400,
  });
  const [modal, setModal] = useState(true);

  useEffect(() => {
    api
    .get('/')
    .then(() => {
      toast.success('Server is connected!', {autoClose: false});
    })
    .catch((error) => {
      console.log(error);
    })

  },[api]);

  const formikRegister = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    onSubmit(values) {
      if (formikRegister.isValid) {
        api
          .post('/user', values)
          .then(() => {
            toast.success('User created successfully!');
            setSignIn(!signIn);
            formikRegister.resetForm();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    },
    validationSchema: registerValidationSchema,
  });

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(values) {
      if (formikLogin.isValid) {
        api
          .post('/login', values)
          .then((response) => {
            const { data } = response;
            login(data.token);
            formikLogin.resetForm();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }

    },
    validationSchema: loginValidationSchema,
  });

  return(
    <>
    <ToastContainer/>
    <div className={styles.wrapper}>
      {modal && <Modal setModal={setModal}/>}
      <div className={styles.title}>
        <p>WELCOME TO</p>
        <p>JUST A KANBAN</p>
        <p>Organize <span>{text}</span> <br /> in a simple way.</p>
      </div>

      <div className={styles.test}>


      {signIn ? 
      <div className={styles.formWrapper}>
          <Kanban size={64}/>
        <form className={styles.form} onSubmit={formikLogin.handleSubmit}>
          <div className={styles.input}>
            <Input 
              placeholder='E-mail' 
              type='email'
              value={formikLogin.values.email}
              onChange={formikLogin.handleChange('email')}
              error={
                formikLogin.touched.email && formikLogin.errors.email
                ? formikLogin.errors.email
                : ''
              }
            />
          </div>
            <div className={styles.input}>
              <Input
                type='password'
                placeholder='Password'
                value={formikLogin.values.password}
                onChange={formikLogin.handleChange('password')}
                error={
                  formikLogin.touched.password && formikLogin.errors.password
                  ? formikLogin.errors.password
                  : ''
                }
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
        <form className={styles.form} onSubmit={formikRegister.handleSubmit}>
          <div className={styles.input}>
            <Input 
              placeholder='Name' 
              type='text'
              value={formikRegister.values.username}
              onChange={formikRegister.handleChange('username')}
              error={
                formikRegister.touched.username && formikRegister.errors.username
                ? formikRegister.errors.username
                : ''
              }
            />
          </div>
          <div className={styles.input}>
            <Input 
              placeholder='E-mail' 
              type='email'
              value={formikRegister.values.email}
              onChange={formikRegister.handleChange('email')}
              error={
                formikRegister.touched.email && formikRegister.errors.email
                ? formikRegister.errors.email
                : ''
              }
            />
          </div>
            <div className={styles.input}>
              <Input
                type='password'
                placeholder='Password'
                value={formikRegister.values.password}
                onChange={formikRegister.handleChange('password')}
                error={
                  formikRegister.touched.password && formikRegister.errors.password
                  ? formikRegister.errors.password
                  : ''
                }
              />
            </div>

            <div className={styles.login}>
            <p>Already have an account?</p>
            <button type='button' onClick={() => {setSignIn(!signIn)}}>Login</button>
        </div>

          <button type='submit' className={styles.button} >Register</button>
        </form>

        
      </div>
    } 
      
      </div>

    </div>
    </>
  )
}