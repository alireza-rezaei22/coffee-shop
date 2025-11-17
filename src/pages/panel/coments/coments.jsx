import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function coments() {
  const [userComments, setUserComments] = useState([])
  const authContext = useContext(AuthContext)
  useEffect(() => {
    fetch(`http://localhost:3000/comments?userId=${authContext?.userInfo.id}`)
      .then(res => res.json())
      .then(data => setUserComments(data))
  }, []);

  return (
    <>
      <div className="w-full max-w-[900px] h-full p-2 !mx-3 flex flex-col justify-between">
        {userComments.length ?
          <div className="flex flex-col gap-2">
            {userComments.map(comment => {
              return <div key={comment.id} className="p-5 bg-gray-50 flex justify-between gap-5 hover:bg-gray-100 rounded-md">
                <span className="flex gap-5">
                  <img src="/src/assets/images/product.jpg" alt="" className="rounded-md w-20 border border-gray-200" />
                  <span className="flex flex-col justify-between">
                    <h4>{comment.productTitle}</h4>
                    <h5 className="text-gray-600 h-2/3">{comment.comment.length > 30 ? comment.comment.slice(0, 30) + '...' : comment.comment}</h5>
                  </span>
                </span>
                <div className="self-end space-y-2 text-white text-sm flex flex-col md:justify-center md:items-center md:flex-row md:space-x-2 md:space-x-reverse">
                  <Link to={`/ProductDetail/${comment.productId}`}>
                    <button className="bg-blue-500 rounded-md px-2 py-1 text-white hover:bg-blue-600">مشاهده</button>
                  </Link>
                  <button
                    className="bg-red-500 rounded-md px-2 py-1 hover:bg-red-600"
                    onClick={() => {
                      setUserComments(prev => prev.filter(pro => pro.id !== comment.id))
                      fetch(`http://localhost:3000/comments/${comment.id}`, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${authContext.token}`
                        }
                      })
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            })}
          </div>
          :
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-md">
              تاکنون کامنتی ثبت نکرده اید
            </h3>
          </div>
        }
      </div>
    </>
  )
}