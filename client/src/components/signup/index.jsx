import styles from './styles.module.css' ;
import {Link , useNavigate} from 'react-router-dom' ;
import { useState } from 'react';
import axios from 'axios' ;




const Signup = () =>{

    const [data , setData] = useState({
        firstName :"",
        lastName : "",
        email : "" ,
        password :""
    });

    const [error , setError] = useState("") ;

    const navigate = useNavigate();


    const handleChange = ({currentTarget:input}) =>{
        setData({...data , [input.name]:input.value});

    };

    const handleSubmit =async(e) => {
        e.preventDefault();

        try{
            const url ="http://localhost:8080/api/users" ;
            const {data:res} = await axios.post(url,data);
            navigate('/login')
            console.log(res.message);

        }
        catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
                setError(error.response.data.message)
            }
            console.log(error)

        }

    };

    return(

        <div className={styles.signup_container}>

            <div className={styles.signup_form_container}>

  <div className={styles.left}>
            
  <div className={styles.company_header}>
              <br />
             <p className={styles.company_name}> Project Management </p>

        </div>

            
            <Link to = "/login">
                <button type="button" className={styles.white_btn}>
                    Login
                </button>
            
            </Link>

                </div>

     

            </div>
            <div className={styles.right}>    
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create Account </h1>


                <input type='text' placeholder='First Name' 
                name='firstName' value={data.firstName} 
                required className={styles.input}
                onChange={handleChange}
                />

                <input type='text' placeholder='Last Name' 
                name='lastName' value={data.lastName} 
                required className={styles.input}
                onChange={handleChange}
                />


                <input type='email' placeholder='email' 
                name='email' value={data.email} 
                required className={styles.input}
                onChange={handleChange}
                />

                <input type='password' placeholder='password' 
                name='password' value={data.password} 
                required className={styles.input}
                onChange={handleChange}
                />

                {error  && <div className={styles.error_msg}> {error} </div>}

                <button type='submit' className={styles.green_btn}>
                    Sign Up
                </button>

            </form>

  
                </div>    
            
        </div>
        

    )
} 

export default Signup ;