import React from 'react';
import './style.css';
import MyImage from '../../img/glass.png'

const Header = (changeContact, defaultContact) => {
    const searchQuery = async(q) => {
        
      }
    return (
        <div className="header">
            <div className='searchBar'>
                <input type="text" placeholder="Search..." className='searchBar-textfield' onChange={async (e)=>{
                    var myHeaders = new Headers();
      
        
      
                var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    
                let List = await fetch(`http://localhost:5000/search?q=${e.target.value}`,myInit)
            .then(function(response) {
            return response.json();
            }).then(function(json) {
      
                changeContact(defaultContact);
                });
                }}/>
                <button className='searchBtn'><img src={MyImage} width={20}/></button>
            </div>
        </div>
    );
}


    export default Header;