import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import VisitorFileList from "../visitor/components/FileUpload/List";
import HtmlSnippetIndex from "../visitor/components/HtmlSnippet/List";
import LinkListIndex from "../visitor/components/Link/List";
import Index from '../visitor/Index';
import EditFileUpload from "./FileUpload/Edit";
import FileList from "./FileUpload/List";
import NewFileUpload from "./FileUpload/New";
import HtmlSnippetEdit from "./HtmlSnippet/Edit";
import HtmlSnippetList from "./HtmlSnippet/List";
import HtmlSnippetNew from "./HtmlSnippet/New";
import LinkEdit from "./Link/Edit";
import LinkList from "./Link/List";
import LinkNew from "./Link/New";




export default function RouteList() {

  return (
    <Routes>
        <Route path="/fileUpload/new" element={<NewFileUpload />} />
        <Route path="/fileUpload/edit/:id" element={<EditFileUpload />} />
        <Route exact path='/' element={<FileList />} />
        <Route path='/visitor/fileUpload/list' element={<VisitorFileList />} />
        <Route path='/visitor' element={<Index />} />
        <Route path='/link' element={<LinkList />} />
        <Route path='/link/edit/:id' element={<LinkEdit />} />
        <Route path='/link/new' element={<LinkNew />} />
        <Route path='/visitor/link' element={<LinkListIndex />} />
        <Route path='/htmlsnippet' element={<HtmlSnippetList />} />
        <Route path='/htmlsnippet/edit/:id' element={<HtmlSnippetEdit />} />
        <Route path='/htmlsnippet/create' element={<HtmlSnippetNew />} />
        <Route path='/visitor/htmlsnippet' element={<HtmlSnippetIndex />} />
    </Routes>
  )
}
