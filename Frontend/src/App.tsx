import './assets/styles/global.css'
import {Routes, Route} from "react-router-dom";
import BecomeAuthor from "./Pages/becomeAuthor/BecomeAuthor";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Profile from "./Pages/Auth/Profile/Profile";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import AddPost from "./Pages/AddPost/AddPost";
import PostDetails from "./Pages/PostDetails/PostDetails";
import {useAppDispatch, useAppSelector} from "./redux/hook/hook";
import {useEffect} from "react";
import {fetchProfile, selectIsAuthenticated} from "./redux/Slices/authSlice";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";

const App = () => {
    let isAuth = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfile())
    },[])
    return (
       <>
           <Header/>
           <div>
               <Routes>
                   <Route path="/" element={<Home/>}/>
                   <Route path="/posts/:id" element={<PostDetails/>}/>
                   <Route path="/posts/:id/edit" element={<AddPost/>}/>
                   <Route path="/createPost" element={<AddPost/>}/>
                   <Route path="/start" element={<BecomeAuthor/>}/>
                   <Route path="/profile" element={<Profile/>}/>
                   <Route path="/register" element={<Register/>}/>
                   <Route path="/login" element={<Login/>}/>
               </Routes>
           </div>
       </>
    );
};

export default App;