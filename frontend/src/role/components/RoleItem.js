import React from "react";
import './RoleItem.css'
import Card from "../../shared/UIElements/Card";


const RoleItem = (props)=>{
    return(
        <li className="role-item">
            <Card className='role-item__content'>
                    <div className="role-item__info">
                        <h2>{props.name}</h2>
                        <h2>{props.id}</h2>
                    </div>
            </Card>
        </li>
    );
}

export default RoleItem;