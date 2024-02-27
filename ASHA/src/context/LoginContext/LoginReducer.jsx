import React from 'react'

export const LoginReducer = (state, action) => {
switch (action.type) {
    case 'Singin':
        
        return{
            ...state, 
            status: 'autenticado',
            user:string,
            email:string,
            token:string,
            error:null
        }
        case'SingUp':
        return {
            ...state, 
        }

    default:
        break;
}
}

