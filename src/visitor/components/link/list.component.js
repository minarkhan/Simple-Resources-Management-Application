import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import SubNav from './../subnav';


export default function List() {

    const [links, setlinks] = useState([])

    useEffect(() => {
        fetchlinks()
    }, [])

    const fetchlinks = async () => {
        await axios.get(`http://localhost:8000/api/links`).then(({ data }) => {
            setlinks(data)
        })
    }

    const deleteLink = async (id) => {
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

        await axios.delete(`http://localhost:8000/api/links/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchlinks()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <>
        <SubNav />
        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <h3>Link</h3>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        links.length > 0 && (
                                            links.map((row, key) => (
                                                <tr key={key}>
                                                    <td>{row.title}</td>
                                                    <td>
                                                        <a title={row.new_tab == 'yes' ? 'Open in a new tab' : 'Click Here' } target={row.new_tab == 'yes' ? '_blank' : '' } href={row.link}>{row.link}</a>
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
        </>
    )
}
