import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email:'',
        password:'',
    })

    const [error, setError] = useState("");

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/login';
            const {data: response} = await axios.post(url, data);
            localStorage.setItem('token', response.data.token);
            enqueueSnackbar("Logged In Successfully", { variant: "success" });
            navigate("/");
            console.log(response);
         } catch (error) {
            if(error.response && error.response.status >= 400
                && error.response.status <= 500
            ) {
                console.log(error.response.data); // Log error message to the console
                setError(error.response.data);

                setTimeout(() => {
                    setError("");  // Clears the error message
                }, 1500);
              
            }
            
        }
    }

    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                        <h1>Login to Your Account</h1>

                        <input type="email"
                        placeholder='Email'
                        name='email'
                        value={data.email}
                        required
                        className={styles.input}
                        onChange={handleChange} />

                        <input type="password"
                        placeholder='Password'
                        name='password'
                        value={data.password}
                        required
                        className={styles.input}
                        onChange={handleChange} />

                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}> Sign Up</button>
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}> Sign Up</button>
                    </Link>
                    
                </div>
            </div>
        </div>
       
    )

}

export default Signup;