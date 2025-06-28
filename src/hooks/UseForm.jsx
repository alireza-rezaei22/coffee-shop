import { useReducer } from "react"
const formReducer = (state, action) => {
    switch (action.type) {
        case ('INPUT_CHANGE'): {
            let isFormValid = true
            let responseMsg = null
            let userData = null
            for (const input in state.inputs) {
                if (input === action.id) {
                    isFormValid = (isFormValid && action.isValid)
                } else {
                    isFormValid = isFormValid && state.inputs[input].isValid
                }
            }
            if (isFormValid) {
                if(action.id !== 'loginPassword'){
                    if(action.id === 'password' && state.inputs.confirm.value !== action.value){
                        isFormValid =false
                        responseMsg = 'گذرواژه و تکرار همخوانی ندارند'
                    }else if(action.id === 'confirm' && state.inputs.password.value !== action.value){
                        isFormValid= false
                        responseMsg = 'گذرواژه و تکرار همخوانی ندارند'
                    }else{
                        responseMsg = null
                    }
                }
                
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isFormValid,
                responseMsg,
                // userData: {
                //     ...state.userData,
                //     [action.id]: action.value
                // }
                // userData: action.value
            }
        }
        // case('SUBMIT'):{
        //     userData
        // }
    }
}


export const UseForm = (inintInput) => {
    // console.log(isFormValid);
    const [formReduce, dispatch] = useReducer(formReducer, {
        inputs: inintInput,
        isFormValid: false,
        responseMsg : null,
    })
    const inputChange = (id, value, isValid) => {
        console.log(formReduce);
        dispatch({
            type: 'INPUT_CHANGE',
            id,
            value,
            isValid
        })
    }
    return [formReduce, inputChange]
}