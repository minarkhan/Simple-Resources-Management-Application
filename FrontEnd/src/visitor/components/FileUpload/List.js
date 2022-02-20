import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [fileUploads, setFileUploads] = useState([])

    useEffect(() => {
        fetchFileUploads()
    }, [])

    const fetchFileUploads = async () => {
        await axios.get(`http://localhost:8000/api/fileUploads`).then(({ data }) => {
            setFileUploads(data)
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/fileUploads/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchFileUploads()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <h3>File List</h3>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fileUploads.length > 0 && (
                                            fileUploads.map((row, key) => (
                                                <tr key={key}>
                                                    <td>{row.title}</td>
                                                    <td>{row.description}</td>
                                                    <td>
                                                        <a target='_black' role="button" href={`http://localhost:8000/storage/fileUpload/image/${row.image}`} download="nameOfFiel">Download</a>
                                                        {/* <a target='_black' className='btn btn-primary' href={`http://localhost:8000/storage/product/image/${row.image}`}>file</a> */}
                                                        {/* <img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} /> */}
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
