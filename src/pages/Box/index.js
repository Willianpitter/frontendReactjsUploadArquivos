import React, { Component } from 'react';
import "./styles.css";
import logo from "../../assets/pinguim-2.jpg";
import {MdInsertDriveFile} from 'react-icons/md'
import api from "../../services/api"

// import { Container } from './styles';

export default class Box extends Component {
  state = {
    box: {}
  }
  async componentDidMount(){
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({box: response.data});
  }

  render() {
 
    return (
      <div id = "box-container">
        <header>
          <img src = {logo} alt=""/>
          <h1>{this.state.box.title}</h1>
        </header>

        <ul>
        {this.state.box.files && this.state.box.files.map(file => (
          <li>
            <a href="" className = "fileInfo" target = "blank">
              <MdInsertDriveFile size={24} color= "#A5Cfff"/>
              <strong>{file.title} </strong>
            </a>
              <span>Há {file.createdAt} minutos atrás</span>
          </li>
        ))}
        </ul>
      </div>
    
    )
    ;
  }
}
