import { paymentActions } from "./payment-slice";
import { axiosInstance } from "../../utils/axios";

export const initiateCheckoutSession = (paymentDate) => async (dispatch)=>{
    try{
        dispatch(paymentActions.getCheckoutRequests());
        const response = await axiosInstance.post("/v1/rent/user/booking/create-order",paymentDate)
        if (!response) throw new Error("Failed to initiate checkout Session");
        dispatch(paymentActions.getCheckoutSuccess(response.data));
    }
    catch{error}{
        dispatch(paymentActions.getError(error.response?.data?.message || error.message))
    }
}

export const verifyPayment =(verifyData) =>async(dispatch) =>{
    try{
        dispatch(paymentActions.getVerifyRequest());
        const response = await axiosInstance.post("/v1/rent/user/booking/verify-payment",verifyData)
        if(!response) throw new Error("Failed to verify payment");
        dispatch(paymentActions.getVerifySuccess(response.data))
    }catch(error){
        dispatch(paymentActions.getError(error.response?.data?.message || error.message))
    }
}