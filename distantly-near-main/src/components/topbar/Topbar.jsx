import "./topbar.css"
import {Search,Person,Chat,Notifications} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = () => {
        dispatch({type:"LOGOUT"});
    };

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Distantly-Near</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    {/* <Search className="searchIcon"/> */}
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
                <span className="topbarLink" onClick={handleLogout}>{user && "LOGOUT"}</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
        <Link to={`/profile/${user.username}`}>
        <img alt="" className="topbarImg" src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }></img>
        </Link>
        </div>
    )
}
