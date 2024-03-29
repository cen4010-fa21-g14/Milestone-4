import "./post.css"
// import {MoreVert} from '@mui/icons-material';
// import {Users} from "../..//dummyData";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
// import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Post({post}) {
    
    const[like,setLike] = useState(post.likes.length)
    const [ isLiked,setIsLiked] = useState(false);
    const [ user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
      
    useEffect(() =>{
        const fetchUser = async () =>{
            const res = await axiosInstance.get(`/users?userId=${post.userId}`);
            setUser(res.data);

        }
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[post.userId]);

    const likeHandler = () => {
        try {
            axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" alt="" src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }></img>
                        </Link>
                        <span className="postUsername">{user.username}</span>

                        <span className="postDate">{format(post.createdAt)}</span>
                        {/* <span className="postDate">{post.createdAt}</span> */}
                    </div>
                    <div className="postTopRight">
                        {/* <MoreVert/> */}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.image} alt=""></img>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" alt="" src={`${PF}like.png`} onClick={likeHandler}></img>
                        <img className="likeIcon" alt="" src={`${PF}heart.png`} onClick={likeHandler}></img>
                        <span className="postLikeCounter">{like} people like it </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">  {post.comment} Commented</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
