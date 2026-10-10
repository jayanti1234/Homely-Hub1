import { createSlice } from "@reduxjs/toolkit";
import { propertyAction } from "../Property/property-slice";
import { resetPassword } from "../User/user-action";

const initialState ={
    PaymentDetails:{
        checkinDate:null,
        checkoutDate:null,
        totalPrice:0,
        propertyName: "",
        guests:1,
        nights:0
    },
    loading:false,
    error:null,
    orderDate:null
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers:{
        setPaymentDetails: (state,action)=>{
            state.PaymentDetails = action.payload
    },
    getCheckoutRequests:(state)=>{
        state.loading = true;
        state.error = null; 
    },
    getCheckoutSuccess:(state,action)=>{
        state.loading = false,
        state.orderDate = action.payload
    },
    getVerifyRequest:(state) =>{
        state.loading = true;
        state.error = null;
    },
    getVerifySuccess:(state) =>{
        state.loading = false;
    },
    getError:(state,action)=>{
        state.loading = false;
        state.error = action.payload
    },
    resetPayment:(state)=>{
        state.orderDate = null;
        state.error = null;
        state.loading = false
    }
  }
})
export const paymentActions = paymentSlice.actions;
export const {setPaymentDetails} = paymentSlice.actions;

export const selectPaymentDetails =(state) => state.payment.PaymentDetails;
export const selectPaymentStatus = (state) =>({
    loading:state.payment.loading,
    error:state.payment.error,
    orderDate:state.payment.orderDate
})

export default paymentSlice