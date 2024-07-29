import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../Component/Constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../Redux/userSlice';
import { getRefresh } from '../Redux/tweetSlice';
import Avar  from '../Component/Avar png.png'
const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            
        }else{
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img  className='w-full' src='data:image/jpeg;base64,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' alt="banner" />
                <div className='absolute top-52 ml-2 mt-20 border-4 border-white rounded-full'>
                    <Avatar src={Avar} size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>
                <div className='m-4 mt-10'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
    )
}

export default Profile