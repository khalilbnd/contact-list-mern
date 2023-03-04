import React, {useState} from 'react';
import nft from './nft.jpg';
import './style.css';

const Modal = ({ type, data, setData, AddAction, ModifyAction, open, onClose }) => {
    
   

    const checkInformation = (id, firstName, lastName, email, phonenumber) =>{
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(firstName === "" || lastName === "" || email === "" || phonenumber === ""){
            alert("Please fill in all the fields");
        }else if(!emailRegex.test(email)){
            alert("Please enter a valid email address");
        }else if(!phoneNumberRegex.test(phonenumber)){
            alert("Please enter a valid phone number");
        }
        else{
            if(type === "add")
                AddAction(firstName, lastName, email, phonenumber);
            else if(type === "modify")
                ModifyAction({id, firstName, lastName, email, phoneNumber: phonenumber});
            onClose();
        }
    }
    
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <div className='formGroup' >
                    <input type='text' id='firstName' name='firstName' value={data.firstName} placeholder='First Name' onChange={(e)=>{setData.setFirstName(e.target.value)}} />
                    <input type='text' id='lastname' name='lastname' placeholder='Last Name' value={data.lastName} onChange={(e)=>{setData.setLastName(e.target.value)}} />
                    <input type='email' id='email' name='email' placeholder='Email' value={data.email} onChange={(e)=>{setData.setEmail(e.target.value)}} />
                    <input type='text' id='phonenumber' name='phonenumber' placeholder='Phone Number' value={data.phonenumber} onChange={(e)=>{setData.setPhonenumber(e.target.value)}} />
                <div className='btnContainer'>
                    <button className='btnPrimary' id="submit" onClick={()=>checkInformation(data.id, data.firstName, data.lastName, data.email, data.phonenumber)}>
              <span className='bold'>{type === "add" ? "Add Contact" : "Edit Contact"}</span>
            </button>
            
          </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;