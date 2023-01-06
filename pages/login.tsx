import { useState, useRef, useEffect } from 'react';
import { Form, useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import { AppBar, Typography } from '@mui/material'
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { TextField } from '@mui/material'
import Appbar from '../components/navbar'
import axios from 'axios';
import Router from 'next/router';
import Link from "next/link";
import { useRouter } from 'next/router';
import { getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'
import { hasCookie } from 'cookies-next';
import dynamic from 'next/dynamic'








const USED_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Login = () => {



  // state onsubmit
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false)

  //chat gpt edit starts here
  const [disabled, setDisabled] = useState(false);
  let [failCount, setFailCount] = useState(3);

  const router = useRouter()

  // useEffect(() => {
  //   if (failCount <= 0) {
  //     setDisabled(true);
  //   }
  // }, [failCount]);

  useEffect(() => {
    const checkCookie = setInterval(() => {
        // If the cookie is removed, automatically logout the user by redirecting them to the login page
        const token = getCookie("token")
        if (token) {
            router.replace(`./profile/${token}`)
        }
    }, 1000)

    return () => clearInterval(checkCookie)
}, [])



  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  // Formik
  const formik = useFormik({
    initialValues: {

      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {

      const res = await axios.get('https://638aa9827220b45d22805a6a.mockapi.io/data');
      const data = res.data
      const result = data.filter(function (user) {
        if (user.username === values.username && user.password === values.password) {

          if (user.id == getCookie("lock")) {
            setStatus('warning')
            setMessage('your account is temporarily lock for several minutes, please try again later.')
            setSubmitted(true)
          }

          else {
            setStatus('success')
            setMessage('Login Successfully')
            setSubmitted(true)
            setCookie("token", user.id)
            Router.replace(`/profile/${user.id}`)
          }

        }

        
        else if (user.username === values.username && user.password !== values.password) {

          const currentTime = new Date();
          const expireTime = new Date(currentTime.getTime() + 20 * 1000); //20 seconds
          
          setFailCount(failCount - 1);
          setStatus('warning')
          setMessage('Wrong username or password ' + failCount + "  attempts remaining")
          setSubmitted(true)

          if (user.id == getCookie("lock")) {
            setStatus('warning')
            setMessage('your account is temporarily lock for several minutes, please try again later.')
            setSubmitted(true)
          }


          else if (failCount == 0) {
            
            
            setCookie("lock", user.id, { expires: expireTime });
            setStatus('warning')
            setMessage('Account locked until ' + expireTime)
            setSubmitted(true)

          }

          else if (failCount <= 0){
            setStatus('warning')
            setMessage('Please comeback later..')
            setSubmitted(true)

            if(!getCookie("lock")){

              setFailCount(failCount = 3 );
              setStatus('success')
              setMessage('Fail Count: ' + failCount)
              setSubmitted(true)
            }
          }

        }

       

        setSubmitting(false);


      }, 1000);


    },
    validationSchema: yup.object({
      username: yup.string().trim().required('Username is required'),

      password: yup
        .string()
        .trim()
        .required('Password is required'),
    }),
  });
  // Formik end

  return (
    <>
      
      <Appbar />

      <Container maxWidth="sm" sx={{ textAlign: "center", pt: 10 }}>
        <Box
          sx={{
            marginTop: 1,
            alignItems: 'center',
            backgroundColor: ""
          }}
        >
          <Box hidden={!submitted} style={{ margin: 15 }} role="alert">
            <Alert severity={status} sx={{ textAlign: "center" }}>{message}</Alert>
          </Box>
          <Typography sx={{ fontSize: 50 }}> Login </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField id="outlined-basic" label="Username" variant="outlined" sx={{ mt: 1 }}
              type="text"
              name="username"
              placeholder="John Doe"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.touched.username && formik.errors.username ? <div className="text-danger" style={{ marginBottom: -30 }}>{formik.errors.username}</div> : null}<br />

            <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ mt: 1 }}
              type="password"
              name="password"
              placeholder="John Doe"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.touched.password && formik.errors.password ? <div className="text-danger" style={{ marginBottom: -30 }}>{formik.errors.password}</div> : null}<br />
            <br />

            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Login
            </Button>

          </form>
          {/* style={{padding:15, backgroundColor:"#379CDD", color:"white",width:"100%", borderRadius:"1"}}> */}


        </Box>
      </Container>

    </>
  );
};

export default Login;