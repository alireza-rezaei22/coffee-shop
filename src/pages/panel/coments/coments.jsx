import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import Styles from './comments.module.css'

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
      <div className={Styles.basketBox}>
        {userComments.length ?
          <>{
            <div className={Styles.basketList}>
              {userComments.map(comment => {
                return <div key={comment.id} className={Styles.basketItem}>
                  <span className={Styles.rightSec}>
                    <img src="/src/assets/images/product.jpg" alt="" />
                    <span className={Styles.itemInfo}>
                      <h4>{comment.productTitle}</h4>
                      <h5 className={Styles.coment}>{comment.comment.length > 30 ? comment.comment.slice(0, 30) + '...' : comment.comment}</h5>
                    </span>
                  </span>
                  <div className={Styles.actions}>
                    <Link to={`/ProductDetail/${comment.productId}`}>
                      <button className={Styles.showItemBtn}>مشاهده</button>
                    </Link>
                    <button
                      className={Styles.deleteItemBtn}
                      onClick={() => {
                        let newuserComments = userComments.filter(pro => {
                          return pro.id != comment.id
                        })
                        setUserComments(newuserComments)
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
          }
          </>
          :
          <div className={Styles.basketList}>
            <h3
              className="text-center text-md"
            >
              تاکنون کامنتی ثبت نکرده اید
            </h3>
          </div>
        }
      </div>
    </>
  )
}
