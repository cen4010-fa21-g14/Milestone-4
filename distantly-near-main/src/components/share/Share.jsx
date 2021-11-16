import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from '@mui/icons-material';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
// import axios from "axios";
export default function Share() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          // const fileName = Date.now() + file.name;
          data.append("file", file);
          data.append("name", file.name);
          newPost.image = file.name;
          console.log(newPost);
          try {
            await axiosInstance.post("/upload", data);
          } catch (err) {}
        }

        try {
          await axiosInstance.post("/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };
        
    return (
        <div className="share">
            <div className="shareWrapper"></div>
            <div className="shareTop">
                <img className="shareProfileImg" alt="" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}></img>
                <input className="shareInput" placeholder={"Whats in your mind " + user.username + "?"} ref={desc} />
            </div>
            <hr className="shareHr"/>
            {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )} */}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input 
                        style={{display: "none"}}
                        type="file" id="file" 
                        accept=".png,.jpeg,.jpg" 
                        onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    )
}
