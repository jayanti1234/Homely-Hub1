import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import userReducer from "./User/user-slice";
import bookingsSlice from "./Booking/booking-slice";
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";
import { Property } from "../../../backend/src/Models/PropertyModel";
const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertyDetails: propertyDetailsSlice,
    
    user: userReducer,
    booking: bookingsSlice,
    payment: paymentSlice,
    accomodation: accomodationSlice
  },
});

export default store;