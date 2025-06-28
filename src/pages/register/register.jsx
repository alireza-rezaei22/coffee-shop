import { useContext,useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "../../hooks/UseForm";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from './register.module.css'
import AlertContext from "../../Contexts/AlertContext";
import { AuthContext } from "../../Contexts/AuthContext";


export default function Register() {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [formState, inputChange] = UseForm({
        username: {
            value: '',
            isValid: false
        },
        contact: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        confirm: {
            value: '',
            isValid: false
        },
    })
    useEffect(()=>{
        if(authContext.isLoggedIn){
            navigate('/')
        }
    },[authContext])
    const submitUser = ()=>{

        const userData = formState.inputs
        let pureUserData = {}
        for (const i in userData){
            if(i !== 'confirm'){
                pureUserData[i]= (i=='contact' && !userData[i].value.includes('@')) ?
                    userData[i].value+'@phone.ph' : userData[i].value
            }
        }
        fetch(`http://localhost:3000/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username : pureUserData.username,
                password : pureUserData.password,
                email : pureUserData.contact,
                basket: []
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text)
                    })
                } else {
                    return res.json()
                }
            })
        .then(data => {
            console.log(data);
            alertContext.showAlertToast('ثبت نام با موفقیت انجام شد', true, true)
            navigate('/login')
        })
        .catch((text) => {
            console.log(text.message);
            switch (text.message) {
                case ('email alredy exist'): {
                    alertContext.showAlertToast('ایمیل یا شماره تلفن قبلا در سیستم ثبت شده', true, false)
                }
                case ('Failed to fetch'): {
                    alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                }
            }
        })
    }
    return (
        <>
        <Navbar/>
        <div className={styles.background}>
            <div className={styles.blurElem}></div>
            <div className={styles.loginBox}>
                <div className={styles.loginBoxBackground}>
                </div>
                <div className={styles.loginForm}>
                    <h1 className="text-4xl">ثبت نام</h1>
                    <h3 className="text-sm">لطفا اطلاعات خواسته شده را وارد کنید</h3>
                    <div className={styles.inputs}>
                        <Input id={'username'}
                            validation={{
                                max: 30,
                                min: 2
                            }}
                            placeholder={'نام و نام خانوادگی'}
                            inputChange={inputChange}
                        />
                        <Input id={'contact'}
                            validation={{
                                min: 6
                            }}
                            placeholder={'شماره تلفن یا ایمیل'}
                            inputChange={inputChange}
                        />
                        <Input id={'password'}
                            validation={{
                                max: 16,
                                min: 4
                            }}
                            placeholder={'گذرواژه'}
                            inputChange={inputChange}
                        />
                        <Input id={'confirm'}
                            validation={{
                                max: 16,
                                min: 4
                            }}
                            placeholder={'تکرار گذرواژه'}
                            inputChange={inputChange}
                        />
                    </div>
                    <button className={styles.submitBtn}
                        disabled={!formState.isFormValid}
                        onClick={submitUser}
                    >
                        ثبت نام
                    </button>
                    {formState.responseMsg &&
                        <p className={styles.errorMsg}>
                            {formState.responseMsg}
                        </p>
                    }
                    <Link to='/login' className={styles.linkToLogin}>ورود</Link>
                </div>
            </div>
        </div>
        </>
    )
}