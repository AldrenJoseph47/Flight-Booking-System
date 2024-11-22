import React from "react";
import './RoleList.css'
import RoleItem from './RoleItem'


const RoleList =(props)=>{

    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>No Roles Found !?..</h2>
            </div>
        )
    }
    return(
        <ul className="roles-list">
            {props.items.map(role =>{
                return <RoleItem key={role._id}
                                    id={role._id}
                                    name={role.role}/>

            })}
        </ul>
    )

}
export default RoleList;