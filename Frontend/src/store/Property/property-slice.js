import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {},
    error: null,
    loading: false,
  },
  reducers: {
    getRequest(state) {
      state.loading = true;
    },

    getProperties(state, action) {
      console.log("Payload:",action.payload);
      console.log("Properties:",action.payload.data);
      state.properties = action.payload.data; // verify payload field
      state.totalProperties = action.payload.all_properties;
      state.loading = false;
    },

    updateSearchParams(state, action) {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
              ...state.searchParams,
              ...action.payload,
            };
    },

    getErrors(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const propertyAction = propertySlice.actions;
export default propertySlice.reducer;