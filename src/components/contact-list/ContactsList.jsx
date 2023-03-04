import React, { useState } from 'react';
import './style.css';
import Trash from '../../img/trash-solid.png';
import Modify from '../../img/modify.png';



const ContactsList = ({contacts, deleteContact, selection}) => {

    return(
        <div className="contactsList">
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                </tr>
                {
                    contacts.map((contact) => {
                        return(
                            <ContactCard 
                                id={contact.id}
                                firstName={contact.firstName}
                                lastName={contact.lastName}
                                phoneNumber={contact.phoneNumber}
                                email={contact.email}
                                deleteContact={deleteContact}
                                selection={selection}
                                />
                        )
                    })
                }
                
                

            </table>
        </div> 
    )
}

const ButtonED = ({type, id, action})=>{
    return(
        <button className={type == "Edit" ? "btn-ed btn-edit" : "btn-ed btn-delete"}
                onClick={()=>action(id)}>
            <p className='btn-title'>{type}</p>
            <img src={type == "Edit" ? Modify : Trash} width={10}/>
        </button>
    )
}
const ContactCard = (props) =>{

    return(
        <tr>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phoneNumber}</td>
            <td>
                <a href={"mailto:" + props.email}>{props.email}</a>
            </td>
            <td><ButtonED type={"Edit"} id={props.id} action={props.selection}></ButtonED></td>
            <td><ButtonED type={"Delete"} id={props.id} action={props.deleteContact}></ButtonED></td>
        </tr>
    )
}


export default ContactsList;