// Data is added, eddited, and deleted in console as the data cannnot be stored and updated in jasonplaceholder.com




import React from 'react'
import './style.css'
import { useState, useEffect } from "react"
import axios from 'axios'



const Form = () => {

    const [data, setData] = useState([])
    const [change, setChange] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState(0)

    /////////////////////////////////////////////////////////////////////////////axios for getting data 
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setData(res.data)
            })
    }, [])

    /////////////////////////////////////////////////////////////////////////////axios for posting data 

    const addData = (e) => {
        e.preventDefault();

        axios.post('https://jsonplaceholder.typicode.com/users', {
            name,
            email
            // address
        }).then(res => console.log('User added', res)).catch(err => console.log(err))
    }

    ////////////////////////////////////////////////////////////////////////////axios for edit

    const getData = (id) => {
        setChange(false)
        let item = data[id - 1]

        setName(item.name)
        setEmail(item.email)
        setId(id)
        clearData()
    }

    const editData = (e) => {
        e.preventDefault();
        let item = { name, email, id }

        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
            name,
            email
        }).then(res => console.log('User Edited', res)).catch(err => console.log(err))
        setChange(true)
        clearData()
    }

    const deleteData = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => console.log('User Deleted', res)).catch(err => console.log(err))
    }

    const clearData = () => {
        setName("")
        setEmail("")
        setId("")
    }

    // console.log(data)

    return (
        <>
            <h1>ADD USER</h1>
            <div className='main_container'>
                <div className='form_div'>
                    <form>
                        <input type="text" value={name} name='name' placeholder='Your name' onChange={(e) => setName(e.target.value)} />
                        <input type="text" value={email} name='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
                        {/* <input type="text" value={address} name='address' placeholder='Your Address' onChange={(e) => setAddress(e.target.value)} /> */}
                        {
                            (change)
                                ? <button className='submitButton' onClick={() => addData}>Add User</button>
                                : <button className='submitButton' onClick={editData}>Edit User</button>

                        }
                    </form>
                </div>
                <h1>USER DATA</h1>

                <div className='tableContainer'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Edit User</th>
                                <th>Delete User</th>
                            </tr>

                            {
                                data.map((data, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td><button onClick={() => getData(data.id)} className="btnEdit">EDIT</button></td>
                                            <td><button onClick={() => deleteData(data.id)} className="btnDelete">DELETE</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Form
