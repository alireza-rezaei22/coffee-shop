import React, { useContext } from 'react'
import Input from '../../../components/input/input'
import { UseForm } from '../../../hooks/UseForm'
import AlertContext from '../../../Contexts/AlertContext'
import { AuthContext } from '../../../Contexts/AuthContext'

export default function Profile() {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const { email: contact, username, password } = authContext?.userInfo || { email: null, username: null, password: null }
    const [formState, inputChange] = UseForm({
        username: {
            value: username,
            isValid: true
        },
        contact: {
            value: contact,
            isValid: true
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

    const editUserInfo = () => {
        let userData = formState.inputs
        let pureUserData = {}
        console.log(userData);
        for (const i in userData) {
            if (i !== 'confirm') {
                pureUserData[i] = (i == 'contact' && !userData[i].value.includes('@')) ?
                    userData[i].value + '@phone.ph' : userData[i].value
            }
        }
        fetch(`http://localhost:3000/users/${authContext.userInfo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: pureUserData.username,
                email: pureUserData.contact,
                password: pureUserData.password,
                basket: pureUserData.basket
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
                alertContext.showAlertToast('اطلاعات با موفقیت ویرایش شد', true, true)
                password
            })
            .catch((text) => {
                console.log(text.message);
                switch (text.message) {
                    case ('Failed to fetch'): {
                        alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                    }
                }
            })
    }

    return (
        <>
            <div className="bg-gray-300 rounded-3xl p-10 w-[500px]">
                <div className="flex items-center flex-col gap-5 mb-10">
                    <span className="w-full space-y-1">
                        <label>نام کاربری: </label>
                        <Input id={'username'}
                            validation={{
                                min: 4,
                                max: 12
                            }}
                            defaultValue={username}
                            placeholder={'نام کاربری ...'}
                            inputChange={inputChange}
                        />
                    </span>
                    <span className="w-full space-y-1">
                        <label>شماره تلفن یا ایمیل: </label>
                        <Input id={'contact'}
                            validation={{
                                min: 6
                            }}
                            defaultValue={contact?.includes('@phone.ph')? contact?.split('@')[0]: contact}
                            placeholder={'شماره تلفن یا ایمیل ...'}
                            inputChange={inputChange}
                        />
                    </span>
                    <span className="w-full space-y-1">
                        <label>گذرواژه جدید: </label>
                        <Input id={'password'}
                            validation={{
                                max: 16,
                                min: 4
                            }}
                            placeholder={'گذرواژه جدید ...'}
                            inputChange={inputChange}
                        />
                    </span>
                    <span className="w-full space-y-1">
                        <label>تکرار گذرواژه جدید: </label>
                        <Input id={'confirm'}
                            validation={{
                                max: 16,
                                min: 4
                            }}
                            placeholder={'تکرار گذرواژه جدید ...'}
                            inputChange={inputChange}
                        />
                    </span>
                </div>
                <button className="bg-zinc-900 text-white w-full p-2 rounded-full disabled:bg-zinc-600"
                    disabled={!formState.isFormValid}
                    onClick={editUserInfo}
                >
                    ثبت
                </button>
            </div>
        </>
    )
}