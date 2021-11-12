import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { useEffect,useState } from "react"
import { axiosInstance } from "../../config"
// import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() =>{
        const fetchUser = async () =>{
            const res = await axiosInstance.get(`/users?username=${username}`);
            setUser(res.data);

        }
        fetchUser();
    },[username]);

    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg" src={user.coverPicture ? PF+user.coverPicture  : PF+"person/noCover.png"} alt=""></img>
                        <img className="profileUserImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}alt=""></img>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.usermame}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>
        </>
    )
}
