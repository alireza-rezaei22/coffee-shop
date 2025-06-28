import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "../../hooks/UseForm";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import styles from './login.module.css'
import { useContext, useEffect, useState } from "react";
import AlertContext from "../../Contexts/AlertContext";
import  {AuthContext} from "../../Contexts/AuthContext";

export default function Login() {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [formState, inputChange] = UseForm({
        contact: {
            value: '',
            isValid: false
        },
        loginPassword: {
            value: '',
            isValid: false
        },
        // isFormValid: false
    })
    useEffect(()=>{
        if(authContext.isLoggedIn){
            navigate('/')
        }
    },[authContext])
    const userData = formState.inputs
    let pureUserData = {}
    for (const i in userData) {
        pureUserData[i] = (i == 'contact' && !userData[i].value.includes('@')) ?
            userData[i].value + '@phone.ph' : userData[i].value
    }
    const [isPassShow, setIsPassShow] = useState(false)
    // const [userPassword, setUserPassword] = useState(null)

    const loginUser = () => {
        fetch('http://localhost:3000/login*', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // 'Authorization': `Bearer ${authContext.token}`
            },
            body: JSON.stringify({
                'email': pureUserData.contact,
                'password': pureUserData.loginPassword
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
            // .then(data => {
            //     console.log(data)
            //     navigate('/')
            // })
        .then(data => {
            console.log(data);
            authContext.login(data.user, data.accessToken)
            alertContext.showAlertToast('ورود با موفقیت انجام شد', true, true)
            navigate('/')
        })
        .catch((text) => {
            console.log(text.message);
            switch (text.message) {
                case ('"Cannot find user"'): {
                    alertContext.showAlertToast('کاربر یافت نشد', true, false)
                    break
                }
                case ('"Incorrect password"'): {
                    alertContext.showAlertToast('گذرواژه اشتباه است', true, false)
                    console.log(text.message);

                    break
                }
                case ('Failed to fetch'): {
                    alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                }
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className={styles.background}>
                <div className={styles.blurElem}></div>
                <div className={styles.loginBox}>
                    <div className={styles.loginBoxBackground}>
                    </div>
                    <div className={styles.loginForm}>
                        <h1 className="text-4xl">ورود</h1>
                        <div className={`w-full ${isPassShow && 'hidden'}`}>
                            <h3 className="text-sm mb-8">شماره تلفن همراه یا ایمیل خود راوارد کنید</h3>
                            <div className="space-y-3">
                                <Input id={'contact'}
                                    validation={{
                                        min: 6
                                    }}
                                    placeholder={'شماره تلفن یا ایمیل'}
                                    inputChange={inputChange}
                                />
                                <button className={styles.continueBtn}
                                    disabled={!userData.contact.isValid}
                                    onClick={() => setIsPassShow(true)}
                                >
                                    ادامه
                                </button>
                            </div>
                        </div>
                        <div className={`w-full ${!isPassShow && 'hidden'} flex-col justify-items-center`}>
                            <h3 className="text-sm mb-8 w-fit">گذرواژه خود راوارد کنید</h3>
                            <div className="space-y-3 w-full">
                                <Input id={'loginPassword'}
                                    validation={{
                                        min: 4,
                                        max: 12
                                    }}
                                    loginInput={true}
                                    placeholder={'گذرواژه'}
                                    inputChange={inputChange}
                                />
                                <button className={styles.continueBtn}
                                    disabled={!formState.isFormValid}
                                    onClick={loginUser}
                                >
                                    ورود
                                </button>
                                <button
                                    className="w-full text-start text-gray-100"
                                    onClick={() => setIsPassShow(false)}
                                >
                                    بازگشت
                                </button>
                            </div>
                        </div>

                        <Link to='/register' className={styles.linkToRegister}>ثبت نام</Link>
                    </div>
                </div>
            </div>
        </>
    )
}