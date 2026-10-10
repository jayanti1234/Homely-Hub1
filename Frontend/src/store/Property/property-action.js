import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";
export const getAllProperties =() => async(dispatch,getState)=>{
try{
 dispatch(propertyAction.getRequest())
 const{searchParams}= getState().property;
 const response = await axiosInstance.get(`/v1/rent/listing`, {params : {...searchParams}})
 if(!response){
    throw new Error("Could not fetch any properties");
 }
 const{data}=response;
 console.log(JSON.stringify(data, null, 2));
 dispatch(propertyAction.getProperties(data));
   }catch(error){
  console.log("ERROR RESPONSE:", error.response?.data);
  console.log("ERROR STATUS:", error.response?.status);

  dispatch(
    propertyAction.getErrors(
      error.response?.data?.message || error.message
    )
  );
}
} 