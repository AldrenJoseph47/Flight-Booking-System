import React from "react";
import './Avatar.css'

const Avatar = (props)=>{
    return (
        <div className={`avatar ${props.className}`} style={props.style}>
            <img src={props.img} alt={props.alt} style={{width: props.width, height: props.height}}></img>
        </div>
    )

}

export default Avatar;