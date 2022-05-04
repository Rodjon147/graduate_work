import {useSelector} from "react-redux";

export function useAuth(){
    const {id, email, username} = useSelector(state => state.user)

    return {
        isAuth: !!email,
        id,
        email,
        username
    }
}