import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "../../hooks/UseForm";
import Input from "../../components/input/input";
import Navbar from "../../components/navbar/navbar";
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
                case ('email already exist'): {
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
        <div className="relative bg-zinc-800 bg-[url(/src/assets/images/header-img.png)] bg-cover bg-fixed -top-[72px] h-screen py-40 flex justify-center">
            <div className="absolute inset-0 w-full h-full backdrop-blur-md"></div>
            <div className="relative w-[450px] h-[450px]">
                <div className="absolute bg-white w-full h-full opacity-45 z-10 rounded-3xl"></div>
                <div className="relative text-white w-full h-full px-12 py-20 z-20 flex flex-col justify-evenly items-center gap-5">
                    <h1 className="text-4xl">ثبت نام</h1>
                    <h3 className="text-sm">لطفا اطلاعات خواسته شده را وارد کنید</h3>
                    <div className="grid grid-cols-2 gap-2">
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
                    <button className="bg-zinc-900 w-full p-2 rounded-full disabled:bg-zinc-600"
                        disabled={!formState.isFormValid}
                        onClick={submitUser}
                    >
                        ثبت نام
                    </button>
                    {formState.responseMsg &&
                        <p className="text-red-500 self-start">
                            {formState.responseMsg}
                        </p>
                    }
                    <Link to='/login' className="text-blue-600 text-sm self-start px-2">ورود</Link>
                </div>
            </div>
        </div>
        </>
    )
}