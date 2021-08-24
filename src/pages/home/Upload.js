import React ,{useState}from 'react'
import {useHistory} from 'react-router-dom'
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from '../../components/Loading'
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios'


function Upload() {
    const { user } = useAuth0();
    const [image,setImage] = useState()
    const [imageid,setImageid]=useState()
    const [caption,setCaption] = useState()
    const [status,setStatus] = useState(false)
    const history = useHistory()
    
    const upload_image = (e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append('file',image[0])
        formData.append('upload_preset','erpcni85')

       Axios.post('https://api.cloudinary.com/v1_1/ratishjaininc/image/upload',formData).then((Response)=> {
            setImageid(Response.data.public_id)
        })

        if (imageid){
            Axios.post('https://socialmedia-mysql-deploy.herokuapp.com/api/upload',{post_id:user.sub,caption:caption,image:imageid,author:user.name}).then((Response)=>{
            console.log(Response)
            setStatus(true)
            })
            history.push('/')

        }
        
    }
    return (
        <div className='Upload container-fluid d-flex flex-column justify-content-center '>
            <div className='container d-flex flex-column  pt-5 w-50 '>
            <label for="myfile">Select Image: </label>
            <input type='file' id="myfile" name="myfile" className='mb-3'  onChange={(e)=>{setImage(e.target.files)}}/>  

            <div className="input-group">
            <span className="input-group-text bg-primary text-white">Caption -></span>
            <textarea className="form-control" aria-label="With textarea" onChange={(e)=>{setCaption(e.target.value)}}></textarea>
            </div>  

            <form className='d-flex justify-content-center pt-4'>
            <button className="btn btn-primary mt-lg-3" type='submit' onClick={upload_image}> Upload </button>
            </form>
             
 
            
            </div>
            
            
           
        </div>
    )
}

export default withAuthenticationRequired(Upload, {
    onRedirecting: () => <Loading type ='spin' color='blue'/>,
  });