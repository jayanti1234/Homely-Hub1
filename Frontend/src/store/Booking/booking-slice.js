import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings:[],
    bookingsDetails:{},
    loading:false
}

const bookingsSlice = createSlice({
    name:"bookings",
    initialState,
    reducers:{
        sendBookingRequest(state){
            state.loading = true
        },
        setBookings(state,action){
            state.bookings.push(action.payload)
        },
        setBookingsDetails :(state,action) =>{
            state.bookingsDetails = action.payload.bookings
        }
    }  
})
export const {setBookings,addBooking,setBookingsDetails} = bookingsSlice.actions;
export default bookingsSlice