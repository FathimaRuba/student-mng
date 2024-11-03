import React,{useState} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi,loginApi } from '../Services/allApi';

function Auth() {

    const [authStatus, setAuthStatus] = useState(false)

    const nav = useNavigate()

    const [user,setuser] = useState({
        email:"",username:"",password:""
    })

    const changeAuth = () => {
        setAuthStatus(!authStatus)
        setUser({
            email:'',password:''
        })
    }    
    
      const handleRegister = async () => {
        // console.log(user);
        const { username, email, password } = user;
        if (!username || !email || !password) {
          toast.warning("Enter Valid Inputs!!");
        } else {
          const res = await registerApi(user);
          // console.log(res);
          if (res.status == 200) {
            toast.success("Registration Successfull!!");
            handleAuth();
            setuser({
              email: "",
              username: "",
              password: "",
            });
          } else {
            toast.error("Registration Failed!!");
          }
        }
      };
    
      const handleLogin = async ()=>{
        const {email, password} = user
        if(!email || !password){
          toast.warning("Enter Valid Inputs!!")
      }
      else{
        const res = await loginApi({email, password})
        if(res.status == 200){
          sessionStorage.setItem('token',res.data.token)
          sessionStorage.setItem('uname',res.data.username)
          toast.success("Login Successfull!!")
          setuser({email:"",username:"",password:""})
          nav('/dash')
      }
      else{
        toast.error("Login failed!!")
        console.log(res);
        
      }
      }
    }
  return (
    <>
            <div className='container-fluid p-3 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='row border shadow w-75 p-5'>
                    <div className="col">
                        <img src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg" className='img-fluid' alt="" />
                    </div>
                    <div className="col">
                        <div className='mt-5 justify-content-center flex-column'>
                            {
                                authStatus ?
                                <h2>Register</h2>
                                :
                                <h2>Login</h2>
                            }

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control onChange={(e)=>setuser({...user,email:e.target.value})} type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            {
                                authStatus &&
                                <FloatingLabel
                                controlId="floatingUsr"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control  onChange={(e)=>setuser({...user,username:e.target.value})} type="text" placeholder="name" />
                            </FloatingLabel>
                            }
                           

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control onChange={(e)=>setuser({...user,password:e.target.value})} type="password" placeholder="Password" />
                            </FloatingLabel>
                            <div className='d-flex justify-content-between my-3'>
                               
                                    {
                                        authStatus ?
                                        <button className='btn btn-danger' onClick={handleRegister}>Register</button>
                                        :
                                        <button className='btn btn-info' onClick={handleLogin}>Login</button>
                                    }
                                
                                <button className='btn btn-link' onClick={changeAuth}>
                                    {
                                        authStatus ?
                                        <span>Already a User? Login</span>
                                        :
                                        <span>New User? Signup</span>
                                    }
                                    
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Auth