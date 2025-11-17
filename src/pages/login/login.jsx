import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "../../hooks/UseForm";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../../Contexts/AlertContext";
import { AuthContext } from "../../Contexts/AuthContext";

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

    const loginUser = () => {
        fetch('http://localhost:3000/login*', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
            <div className="relative bg-zinc-800 bg-[url(/src/assets/images/header-img.png)] bg-cover bg-fixed -top-[72px] h-screen py-40 flex justify-center">
                <div className="absolute inset-0 w-full h-full backdrop-blur-md"></div>
                <div className="relative w-[450px] h-[450px]">
                    <div className="absolute bg-white w-full h-full opacity-45 z-10 rounded-3xl"></div>
                    <div className="relative text-white w-full h-full px-12 py-20 z-20 text-center flex flex-col justify-evenly items-center gap-12">
                        <h1 className="text-4xl">ورود</h1>
                        <div className={`w-full ${isPassShow && 'hidden'}`}>
                            <h3 className="text-sm mb-8">شماره تلفن همراه یا ایمیل خود را وارد کنید</h3>
                            <div className="space-y-3">
                                <Input id={'contact'}
                                    validation={{
                                        min: 6
                                    }}
                                    placeholder={'شماره تلفن یا ایمیل'}
                                    inputChange={inputChange}
                                />
                                <button className="bg-zinc-900 w-full p-2 rounded-full disabled:bg-zinc-600"
                                    disabled={!userData.contact.isValid}
                                    onClick={() => setIsPassShow(true)}
                                >
                                    ادامه
                                </button>
                            </div>
                        </div>
                        <div className={`w-full ${!isPassShow && 'hidden'} flex flex-col items-center`}>
                            <h3 className="text-sm mb-8 w-fit">گذرواژه خود را وارد کنید</h3>
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
                                <button className="bg-zinc-900 w-full p-2 rounded-full disabled:bg-zinc-600"
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
                        <Link to='/register' className="text-blue-600 text-sm self-start px-2">ثبت نام</Link>
                    </div>
                </div>
            </div>
        </>
    )
}