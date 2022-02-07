import axios from "axios";
import { setToken } from "../redux/features/tokenSlice";
import { readToken } from "../utils/checkAuth";
import { useAppDispatch } from "./useRedux";

const useCoach = () => {
    const dispatch = useAppDispatch();

    const createDiet = async (object: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/coach/create`,
                { ...object },
                { withCredentials: true }
            );
            localStorage.setItem('token', JSON.stringify(await readToken(response.data)))
            dispatch(setToken(await readToken(response.data)));
            return response.data
        } catch (error: any) {
            console.log(error)
        }
    }

    const analyzeDiet = async (object: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/coach/analyze`,
                { ...object },
                { withCredentials: true }
            );
            localStorage.setItem('token', JSON.stringify(await readToken(response.data)))
            dispatch(setToken(await readToken(response.data)));
            return response.data
        } catch (error: any) {
            console.log(error)
        }
    }

    return [createDiet, analyzeDiet]
}


export default useCoach;