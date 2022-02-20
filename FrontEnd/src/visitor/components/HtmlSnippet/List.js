import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SubNav from '../SubNav';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser'


export default function List() {

    const [links, setlinks] = useState([])

    useEffect(() => {
        fetchlinks()
    }, [])

    const fetchlinks = async() => {
        await axios.get(`http://localhost:8000/api/htmlsnippets`).then(({ data }) => {
            setlinks(data)
        })
    }

    const deleteLink = async(id) => {
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

        await axios.get(`http://localhost:8000/api/htmlsnippets_delete/${id}`).then(({ data }) => {
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
    const copyToClipboard = (text: string) => {
        const ta = document.createElement("textarea");
        ta.innerText = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        Swal.fire({
            icon: "success",
            text: "text successfullay copied"
        })
    };

    return ( <
        >
        <
        SubNav / >
        <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = 'col-12' >
        <
        h3 > HTML Snippet < /h3> <
        /div> <
        div className = "col-12" >
        <
        div className = "card card-body" >
        <
        div className = "table-responsive" >
        <
        table className = "table table-bordered mb-0 text-center" >
        <
        thead >
        <
        tr >
        <
        th > Title < /th> <
        th > Description < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            links.length > 0 && (
                links.map((row, key) => ( <
                    tr key = { key } >
                    <
                    td > { row.title } < /td> <
                    td >
                    <
                    Card body > { parse(row.description) } <
                    /Card> <
                    /td> <
                    td >
                    <
                    Button className = "me-2 btn btn-success"
                    onClick = {
                        () => copyToClipboard(row.description) } >
                    Copy To Clipboard <
                    /Button> <
                    /td> <
                    /tr>
                ))
            )
        } <
        /tbody> <
        /table> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        />
    )
}