import React,{useEffect,useState} from "react";
import './Profile.css'
import Axios from 'axios'
import { useAuth0 ,withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from '../../components/Loading'
import { Image } from 'cloudinary-react'
const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const [posts,setPosts] = useState([])
  
  useEffect(() => {
    Axios.post('/api/profile',{userid:user.sub}).then((Response)=>{
        setPosts(Response.data)
        console.log(posts)
    })
  }, [])

  return (
    <div>
      <div className="row align-items-center profile-header flex-column">
        <div className="col-md-2 mt-5 d-flex justify-content-center">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0 image__profile"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className='text-center'>
        <p className='fw-bold fs-4 text-decoration-underline'>Posts</p>
        <div className='d-flex flex-wrap container justify-content-center mt-lg-3'>
          {posts.map((post) =>{
            return(
              <Image className='img mb-4 me-3 shadow' cloudName = 'ratishjaininc' publicId={post.image}/>
            )
          })}

        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () =><Loading type ='spin' color='blue'/>,
  });