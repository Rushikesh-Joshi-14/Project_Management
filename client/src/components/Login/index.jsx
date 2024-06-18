import styles from './styles.module.css' ;
import {Link } from 'react-router-dom' ;
import { useState } from 'react';
import axios from 'axios' ;
import hideIcon from '../assets/hide-password.svg' ;







const Login = () =>{

    const [data , setData] = useState({
        email : "" ,
        password :""
    });

    const [error , setError] = useState("") ;

    


    const handleChange = ({currentTarget:input}) =>{
        setData({...data , [input.name]:input.value});

    };

    const handleHide = () =>{
        const pass = document.getElementById("hidePass") ;
        if(pass.type ==="password"){
            pass.type = "text" ;
        }
        else{
            pass.type = "password" ;
        }
    };

    const handleSubmit =async(e) => {
        e.preventDefault();

        try{
            const url ="http://localhost:8080/api/auth" ;
            const {data:res} = await axios.post(url,data);
            localStorage.setItem("token", res.data);
            window.location = '/'
            

        }
        catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
                setError(error.response.data.message)
            }

        }

    };

    return(

        <div className={styles.login_container}>

           
        <div className={styles.main} >

        <div className={styles.company_header}>
        <br /> <br />
             <p className={styles.company_name}>Project Management </p>
             <br /> <br />

        </div>
      
<div className={styles.login_form_container}>


  <form className={styles.form_container} onSubmit={handleSubmit}>
             <p className={styles.form_intro}>Login to get started</p> <br />
                


            <div className={styles.inputContainer}>
            <p>Email</p>  
                <input type='email' 
                name='email' value={data.email} 
                required className={styles.input}
                onChange={handleChange}
                />
            </div> <br /> <br />
                

                <div className={styles.inputContainer}>
                <p> Password</p>  
                <input type='password' id="hidePass"
                name='password' value={data.password} 
                required className={styles.input}
                onChange={handleChange}
                />

               
                </div>
                <img src={hideIcon} id="hideIcn" alt="" className={styles.hideIcon} onClick={handleHide} />
                <p className={styles.forgot_password}>
                    Forgot Password?
                </p>
                 <br /> <br />
              

                {error  && <div className={styles.error_msg}> {error} </div>}

                <button type='submit' className={styles.blue_btn}>
                   Login
                </button>

                
  <div className={styles.right}> 

        
<Link to = "/signup">
    <button type="button" className={styles.Reg_btn}>
        Sign Up
    </button>

</Link>



    </div>   

            </form>

                </div>
      

            </div>
        </div>

    )
} ;

export default Login ;