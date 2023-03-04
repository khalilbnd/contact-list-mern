import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import ContactsList from "./components/contact-list";
import Modal from "./components/modal/Modal";
import MyImage from "./img/glass.png";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getContactList(setContacts);
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [type, setType] = useState("");

  const addContacts = async (firstName, lastName, phoneNumber, email) => {
    const person = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };
    await fetch("http://localhost:5000/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    getContactList(setContacts);
  };
  const deleteContacts = async (id) => {
    const person = {
      id,
    };
    await fetch("http://localhost:5000/delete-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    //setContacts(contacts.filter((contact) => contact.id !== id))
    getContactList(setContacts);
  };
  const selection = (id) => {
    let contact = contacts.find((contact) => contact.id === id);
    setId(contact.id);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setEmail(contact.email);
    setPhonenumber(contact.phoneNumber);
    setType("modify");
    setOpenModal(true);
  };
  const modifyContacts = async (person) => {
    setContacts(
      contacts.map((contact) => (contact.id === id ? person : contact))
    );
    await fetch("http://localhost:5000/modify-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person }),
    });
  };
  const getContactList = async (action) => {
    var myHeaders = new Headers();

    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };

    let List = await fetch("http://localhost:5000/get-contactList", myInit)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        action(json.contactList);
      });
  };
  return (
    <div className="App">
      <div className="header">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search..."
            className="searchBar-textfield"
            onChange={async (e) => {
              var myHeaders = new Headers();

              var myInit = {
                method: "GET",
                headers: myHeaders,
                mode: "cors",
                cache: "default",
              };

              let List = await fetch(
                `http://localhost:5000/search?q=${e.target.value}`,
                myInit
              )
                .then(function (response) {
                  return response.json();
                })
                .then(function (json) {
                  setContacts(json.contactList);
                });
            }}
          />
          <button className="searchBtn">
            <img src={MyImage} width={20} />
          </button>
        </div>
      </div>
      <ContactsList
        contacts={contacts}
        deleteContact={deleteContacts}
        selection={selection}
      />
      <div
        className="floating-btn"
        onClick={() => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhonenumber("");
          setType("add");
          setOpenModal(true);
        }}
      >
        <p className="icon">+</p>
      </div>
      <Modal
        type={type}
        data={{ id, firstName, lastName, email, phonenumber }}
        setData={{ setFirstName, setLastName, setEmail, setPhonenumber }}
        AddAction={addContacts}
        ModifyAction={modifyContacts}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default App;
