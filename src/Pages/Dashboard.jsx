import React, { useState, useEffect,useContext } from 'react'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import Header from '../Components/Header'
import { deleteStudentApi, getStudentsApi } from '../Services/allApi'
import { addResponseContext,editResponseContext } from '../ContextApi/Context'
import { toast } from 'react-toastify'

function Dashboard() {

    const [student, setStudent] = useState([])
    const [searchkey,setSearchKey] = useState("")
    console.log(searchkey)

    const {addResponse,setAddResponse} = useContext(addResponseContext)
    const {editResponse,setEditResponse} = useContext(editResponseContext)

    useEffect(() => {
        getData()
    }, [addResponse,editResponse,searchkey])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getStudentsApi(header,searchkey)
        console.log(res);
        if (res.status == 200) {
            setStudent(res.data)
        }
    }

    const handleDelete = async(id) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await deleteStudentApi(id,header)
        if(res.status == 200){
            toast.success('Student Removed')
            getData()
        }
        else{
            toast.error('Something Went Wrong!!')
        }
    }
    return (
        <>
        <Header />
            <div className='container-fluid'>
                <div className='d-flex justify-content-between'>
                <Add />
                <div>
                <input className='form-control mt-2' type="text" placeholder='Enter Name to Search' onChange={(e)=>setSearchKey(e.target.value)} />
                </div>
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    {
                        student.length > 0 ?
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Phone Number
                                        </th>
                                        <th>
                                            Class
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        student.map((item, index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.batch}</td>
                                                <td>
                                                    <Edit students = {item} />
                                                    <button className='btn' onClick={()=>handleDelete(item?._id)}><i className="fa-solid fa-trash" style={{ color: "#a40414", }} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <h2>No Students</h2>
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard