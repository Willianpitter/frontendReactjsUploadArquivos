import React, { Component } from 'react';
import "./styles.css";
import logo from "../../assets/pinguim-2.jpg";
import {MdInsertDriveFile} from 'react-icons/md'
import api from "../../services/api"
import {formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt'
import Dropzone from 'react-dropzone'
// import { Container } from './styles';
import socket from 'socket.io-client';

export default class Box extends Component {
  state = {
    box: {}
  }
  async componentDidMount(){
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({box: response.data});
  }
  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket('https://instabackend-pitter.herokuapp.com/');
    io.emit('connectRoom', box);
    io.on('file', data => {
      this.setState({box: {...this.state.box, files: [data, ...this.state.box.files]}})
    })

  }
  handleUpload = (files) => {
    files.forEach( file => {
      const data = new FormData();
      const box = this.props.match.params.id;
      data.append('file',file);
      api.post(`boxes/${box}/files`,data);
     console.log(file) 
    })
  }
  render() {
 
    return (
      <div id = "box-container">
        <header>
          <img src = {logo} style = {{width: "7%"}} alt=""/>
          <h1>{this.state.box.title}</h1>
        </header>
        <Dropzone onDropAccepted={this.handleUpload}>
          {({getRootProps, getInputProps}) => (
              <div className='upload' {...getRootProps()}>
                <input {...getInputProps()}></input>
                <p> Arraste arquivos ou clique aqui</p>
              </div>
          )}
        </Dropzone>
        <ul>
        {this.state.box.files && this.state.box.files.map(file => (
          <li key= {file._id}>
            <a href="" className = "fileInfo" target = "blank">
              <MdInsertDriveFile size={24} color= "#A5Cfff"/>
              <strong>{file.title} </strong>
            </a>
            <span>Há {formatDistance(new Date(file.createdAt),new Date(),{locale:pt})}</span>
          </li>
        ))}
        </ul>
      </div>
    
    )
    ;
  }
}
