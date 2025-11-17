export default function Input(props) {
    const {placeholder, inputChange}= props

    const checkValid=()=>{
        inputChange( props.id, event.target.value,validator(
            props.id,
            event.target.value,
            props.validation
        ))
    }
    const validator=(id, value, validation)=>{
        let validationResult = []
        value.length > validation.max && validationResult.push(false)
        value.length < validation.min && validationResult.push(false)
        if(id === 'contact'){
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
            const phoneRegex = /^[0-9]{11}$/
            if(!emailRegex.test(value)){
                if(!phoneRegex.test(value)){
                    validationResult.push(false)
                }
            }
        }
        return validationResult.length ? false : true
    }
    return (
        <input type="text"
            className="bg-white w-full px-5 py-2 text-zinc-800 outline-none rounded-full"
            placeholder={placeholder}
            defaultValue={props.defaultValue}
            onChange={checkValid}
        />
    )
}