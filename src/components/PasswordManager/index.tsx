import React, {useEffect, useState} from "react" ;
import axios from 'axios' ;
import {v4 as uuidv4 } from 'uuid' ;

import PasswordItem from '../PasswordItem' ;

import "./index.css" ;


type detailsObject = {
    id: any ;
    website: string;
    username: string;
    password: any ,
}


function PasswordManager() {


    const [website,setWebsite] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const [passwords,setPasswords]=useState<Array<any>>([])


    const [showPassword,setShowPassword] = useState<boolean>(false)
    const [searchPassword, setSearchPassword] = useState<string>("")

    useEffect(() => {
        fetch("http://localhost:3001/").then((res)=>{
        return res.json()
    })
    .then((resData)=>{
        setPasswords(resData)
    })

    const getData = async() => {
        fetch("http://localhost:3001/").then((res)=>{
        return res.json()
        })
        .then((resData)=>{
            setPasswords(resData)
        })
    }

    getData()

    fetch("http://localhost:3001/passwords/")
    .then((res)=>{
        return res.json()
    })
    .then(data=>{
        setPasswords(data)
    })},[])


    const onClickAddButton = async(e: any) => {
        e.preventDefault()

        const newDetails: detailsObject = {
            id: uuidv4(),
            website,
            username,
            password
        }


        if (website !== "" && username !== "" && password !== "")
        {
            console.log(newDetails)

            await axios("http://localhost:3001/passwords/",{
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin':"*",
            },
            data:JSON.stringify(newDetails)}).then((res)=>{
                setPasswords([ ...passwords, {...newDetails}]);
                setWebsite("")
                setUsername("")
                setPassword("")
                console.log(res)
            }).catch((err)=>console.log(err))
        }else {
            alert("Enter all details")
        }
    }

    const deletePassword = async(id:any)=> {
        // console.log(data1)

        const updatedPasswordList = passwords.filter(
          eachPassword => id !== eachPassword.id,
        )
    
        setPasswords([...updatedPasswordList]);

        await axios(`http://localhost:3001/passwords/${id}`,{
            method: 'DELETE',
            headers: {
            'content-type': 'application/json',
            'accept':'application/json',
            'Access-Control-Allow-Origin':"*",
            }
            })
            fetch("http://localhost:3001/passwords/").then((res)=>{
                return res.json()
            })
            .then((resData)=>{
                console.log(resData)
                setPasswords(resData)
            })
      }

    
    const onClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onChangeSearchPassword =  (e: any) => {
        
        e.preventDefault();
        setSearchPassword(e.target.value);
        
        console.log(searchPassword, e.target.value)


        if (e.target.value !== "") {
            const updatedList = passwords.filter(
                (eachPassword) => eachPassword.website.toLowerCase().includes(e.target.value.toLowerCase()),
            )
            setPasswords([...updatedList])
            console.log(updatedList)
        } else {
            setPasswords([...passwords])
            console.log(passwords)
        }
    }
    


    return (
        <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
            <div className="password-manager-container">
            <form
                className="add-password-container"
                onSubmit={onClickAddButton}
            >
                <h1 className="heading">Add New Password</h1>
                <div className="input-container">
                    <div className="icon-container">
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                        alt="website"
                        className="icon"
                        />
                    </div>
                    <input
                        type="text"
                        value={website}
                        onChange={(e)=> setWebsite(e.target.value)}
                        placeholder="Enter Website"
                    />
                </div>
                <div className="input-container">
                <div className="icon-container">
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="icon"
                    />
                </div>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder="Enter Username"
                />
                </div>
                <div className="input-container">
                <div className="icon-container">
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="icon"
                    />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="Enter Password"
                />
                </div>
                <div className="button-container">
                <button type="submit" className="add-button">
                    Add
                </button>
                </div>
            </form>
            <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="image"
            />
            </div>
            <div className="password-show-container">
            <div className="header-container">
                <div className="container">
                <h1 className="heading">Your Passwords</h1>
                <div className="span-count">
                    <p className="count">{passwords.length}</p>
                </div>
                </div>
                <div className="search-container">
                <div className="icon-container">
                    <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="icon"
                    />
                </div>
                <input
                    type="search"
                    value={searchPassword}
                    onChange={onChangeSearchPassword}
                    placeholder="Search"
                />
                </div>
            </div>
            <hr />
            <div className="show-password-container">
                <div className="container">
                <input
                    type="checkbox"
                    id="showPassword"
                    // value ={showPassword}
                    onChange={onClickShowPassword}
                    className="check-input"
                />
                <label htmlFor="showPassword" className="text">
                    Show Passwords
                </label>
                </div>
            </div>
            {passwords.length === 0 ? (
                <div className="no-password-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="image"
                />
                <p className="heading">No Passwords</p>
                </div>
            ) : (
                <ul className="passwords-container">
                {passwords.map(eachPassword => (
                    <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    deletePassword={deletePassword}
                    showPassword = {showPassword}
                    />
                ))}
                </ul>
            )}
            </div>
        </div>
    )

    }
export default PasswordManager