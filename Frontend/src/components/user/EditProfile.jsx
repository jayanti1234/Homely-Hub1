import React,{Fragment,useEffect,useState} from 'react'
import "../../css/Profile.css";
import { useDispatch, useSelector } from 'react-redux';
import {updateUser} from "../../store/User/user-action";
import {Field, useForm} from "@tanstack/react-form";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { userActions } from '../../store/User/user-slice';

const EditProfile = () => {
    const {user,errors,loading} = useSelector((state)=>state.user);
    const [avatarPreview,setAvatarPreview] = useState(user.avatar.url || "https://i.pravatar.cc/150?img3");
    const Dispatch = useDispatch();
    const navigate = useNavigate();

    const originalUserData = {
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        avatar: user?.avatar?.url || ""
    }
    const onChange = (e) =>{
        const reader = new FileReader();
        reader.onload=() =>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                form.setFieldValue("avatar",reader.result)
            }
        };
        reader.readAsDataURL(e.target.files[0])
    }
    const form = useForm({defaultValues:{
        name: "", phoneNumber: "", avatar:""
    },
    onSubmit:({value}) =>{
        const updateFields ={};
        if(value.name !== originalUserData.name){
            updateFields.name = value.name
        }
        if(value.phoneNumber !== originalUserData.phoneNumber){
            updateFields.phoneNumber = value.phoneNumber
        }
        if(value.avatar !== originalUserData.avatar){
            updateFields.avatar = value.avatar
        }
        if(Object.keys(updateFields).length ===0){
            toast("No changes made");
            return;
        }
        Dispatch(updateUser(updateFields));
        navigate("/profile");
        toast.success("Profile Updated")
    }
});
useEffect(()=>{
    if(errors && errors.length > 0){
        toast.error(errors);
        Dispatch(userActions.ClearErrors());
    }else if (user){
        form.setFieldValue("name",user.name);
        form.setFieldValue("phoneNumber",user.phoneNumber);
        form.setFieldValue("avatar", user.avatar.url || "https://i.pravatar.cc/150?img3")
    }
},[user])
  return (
    <Fragment>
    <div className='row wrapper'>
        <div className='col-10 col-lg-5 updateprofile'>
            <form onSubmit={(e)=>{
                e.preventDefault();
                form.handleSubmit();
            }}
            encType='multipart/form-data'
            >
                <h1 className='mt-2 mb-5'>Update Profile</h1>
        <form.Field name='name'>
            {(Field) =>(
                <div className='form-group'>
                    <label htmlFor="email_field"> Name</label>
                    <input type="text"
                    id='name_field'
                    className='form-control'
                    value={Field.state.value}
                    onChange={(e) => Field.handleChange(e.target.value)} />
                    </div>

            )}
            </form.Field>
            <form.Field name='avatar'>
                {(Field) =>{
                    <div className='form-group'>
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rt1'>
                                    <img src={avatarPreview}
                                    className='rounded-circle' alt="Avatar Preview" />

                                </figure>
                        </div>
                        <div className='custom-file'>
                            <input type="file"
                            name={Field.name}
                            className='custom-file-input'
                            id='avatarupdate'
                            accept='image/'
                            onChange={onChange} />
                            <label className='custom-file-label' htmlFor="customFile">
                                Choose Avatar
                            </label>

                        </div>
                    </div>
                    </div>
                }}
            </form.Field>
            <button type='submit' className='update-btn btn-block'>
                {loading ? "Updating" : "update"}
            </button>
            </form>
        </div>
    </div>
    </Fragment>
  )
}

export default EditProfile
