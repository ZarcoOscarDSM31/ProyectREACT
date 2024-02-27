import { createContext, useReducer } from "react"
import { LoginReducer } from "./LoginReducer";
import instance from "../../api/axios";

export const initialState={
    status:'no-autenticado',
    user:null, 
    email:null,
    token:null,
    error:null
}

export const LoginContext = createContext();
export const AuthProvider=({children})=>{
    const [state, dsipach ]=useReducer(LoginReducer, initialState)
    const singIn=async( data)=>{
try {
    const resp=await instance.post('/login', data)
    console.log('Esta es la respuesta',resp.data)
    dsipach({
        type:'Singin',
        payload:resp.data, 
        user:resp.data.user, 
        email:resp.data.email, 
        token:resp.data.token,
    })
} catch (error) {
    console.log('Este es el error ',error)
    
}
    }
    return(
        <LoginContext.Provider value={{
            ...state,
            singIn
        }}>
            {children}
        </LoginContext.Provider>
    )
}


