import React,{useEffect,useState }from 'react'
import {Card} from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'
import {Image} from 'cloudinary-react'

import Axios from 'axios'
function Home() {
    const [posts,setPosts] = useState([])
    
    useEffect(() => {
        Axios.get('https://social-media-rj.herokuapp.com/api/posts').then((Response) =>{
            setPosts(Response.data)
            console.log(posts)
        })
    }, [])

    return (
    <div className='container-fluid d-flex  mt-4 flex-column justify-content-center'>
       {posts.reverse().map((post) => {
           return(
               <div className="card mt-3 mx-auto shadow" style={{width:'22rem'}}>
                <Image className="card-img-top" style={{width:'22rem',height:'21rem',objectFit:'fill'}} cloudName='ratishjaininc' publicId={post.image} />
                <div className="card-body">
                <h5 className="card-title">{post.author}</h5>
                <p className="card-text">{post.caption}</p>
                
             </div>
            </div>
           )
       
       })}
    </div>
    )
}

export default Home
