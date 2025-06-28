import styles from './comment.module.css'

export default function Comment(props) {
    const {name, comment} = props
    return (
        <div className='mb-3'>
            <span className={styles.ownerBox}>
            <h4 className={styles.CommentOwner}>
                {name}
            </h4>
            </span>
            {/* <span>the shape</span> */}
            <p className={styles.comment}>
                {comment || 'هنوز هیچ نظری برای این محصول ثبت نشده'}
            </p>
        </div>
    )
}