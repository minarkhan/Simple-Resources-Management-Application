import axios from 'axios';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SubNav from './../../admin/subnav';

export default function New() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [newTab, setNewTab] = useState("false")
  const [validationError,setValidationError] = useState({})

  const createFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('title', title)
    formData.append('link', link)
    formData.append('new_tab', newTab)

    await axios.post(`http://localhost:8000/api/links`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/link")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <>
        <SubNav />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">New Link Add</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createFileUpload}>
                  <Row>
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="url" value={link} onChange={(event)=>{
                              setLink(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Open in a new tab</Form.Label>
                            <Form.Check 
                              type="checkbox"
                              id="new_tab"
                              label="New Tab"
                              checked={newTab === true}
                              onClick={(event)=>{ setNewTab(event.target.checked) }}
                            />
                        </Form.Group>
                      </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
