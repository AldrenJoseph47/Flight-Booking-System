import React, { useEffect, useRef, useState } from "react";
import './ImageUpload.css'

const ImageUpload = (props) => {

    // to manage the file
    const[file,setFile] = useState();
    const[previewUrl,setPreviewUrl] = useState();
    const[isValid,setIsValid] = useState();

    // to set the preview we need to implement useEffect hook
    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        // to convert the file which is binary data into readable image url
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);   
    },[file])

    const filePickerRef = useRef();

    const pickedHandler = (event) => {
        // console.log(event.target)
        let pickedFile;
        let fileIsValid;
        if(event.target.files || event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid=true
        }else{
            setIsValid(false);
        }
        // passing file from parent to child
        props.onInput(props.id,pickedFile,fileIsValid)
    }
    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return(
        <div className="form-control">
            <input  
            id={props.id}
            style={{display:'none'}}
            ref={filePickerRef}

            type="file"
            accept=".jpg, .png, .jped"
            onChange={pickedHandler}
            />

            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl && <p>Please Pick An Image</p>}
                </div>
                <button type="button" onClick={pickImageHandler}>PICK IMAGE</button>
            </div>
            {!isValid && <p>{props.errorText}</p>}

        </div>
    )
}

export default ImageUpload;

