export default function Comment(props) {
    const { name, comment } = props;
    return (
        <div className="mb-3">
            <span className="relative flex w-fit">
                <h4 className="w-fit before:bg-red-500 before:absolute before:bottom-0 before:left-0 before:w-2/5 before:h-1 after:bg-blue-500 after:bottom-0 after:right-0 after:w-3/5 after:h-1">
                    {name}
                </h4>
            </span>
            <p className="px-8 py-2 italic overflow-scroll">
                {comment || 'هنوز هیچ نظری برای این محصول ثبت نشده'}
            </p>
        </div>
    );
}