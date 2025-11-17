import { useEffect, useState, useContext } from "react"
import Comment from '../comment/comment'
import { AuthContext } from "../../Contexts/AuthContext";
import AlertContext from "../../Contexts/AlertContext";

export default function Comments({productId, productTitle}) {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const userInfo = authContext?.userInfo
    console.log(userInfo);
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/comments?productId=${productId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
    }, [])
    const [userComment, setUserComment] = useState()
    const submitComment = () => {
        if (authContext.isLoggedIn) {
            if (userComment) {
                fetch('http://localhost:3000/comments', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: productId,
                        userId: userInfo.id,
                        name: userInfo.username,
                        productTitle: productTitle,
                        comment: userComment,
                    })
                })
                    .then(res => {
                        console.log(res);
                        if (!res.ok) {
                            return res.text().then((text) => {
                                throw new Error(text)
                            })
                        } else {
                            return res.json()
                        }
                    })
                    .then(data => {
                        setComments(prev => [...prev, data])
                        alertContext.showAlertToast('دیدگاه شما با موفقیت ثبت شد', true, true)
                    })
                    .catch((text) => {
                        console.log(text.message);
                        switch (text.message) {
                            case ('Failed to fetch'): {
                                alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                            }
                        }
                    })

                alertContext.showAlertToast('لطفا مقداری وارد کنید', true, false)

            }
        } else {
            alertContext.showAlertToast('لطفا ابتدا وارد شوید', true, false)

        }
        setUserComment('')
    }
    return (
        <div className="relative bg-gradient-to-bl from-indigo-600 to-indigo-900 text-zinc-200 flex flex-col items-center rounded-3xl px-5 py-8 mt-5 mb-24 ::">
            <h2 className='text-xl'>دیدگاه کاربران</h2>
            <div className="self-start mt-8 mb-16 divide-y-[1px] w-full">
                {(comments.length > 0) ? comments.map(comment => {
                    return <Comment key={comment.id} {...comment} />
                }) :
                    <Comment />
                }
            </div>
            <div className="bg-blue-100 absolute -bottom-24 w-[50%] flex flex-col justify-center gap-y-2 items-center text-zinc-500 rounded-3xl px-10 py-4">
                <h2>ثبت دیدگاه</h2>
                <textarea
                    className="w-[100%] h-32 px-4 rounded-2xl outline-none resize-none overflow-y-auto"
                    value={userComment}
                    onChange={e=> setUserComment(e.target.value)}
                >

                </textarea>
                <button className="absolute -left-8 bg-blue-500 text-white rounded-full px-3 py-1" onClick={submitComment}>ارسال</button>
            </div>
        </div>
    )
}