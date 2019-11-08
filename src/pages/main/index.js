import React, { Component } from 'react';
import "./styles.css";
import logo from "../../assets/pinguim-2.jpg";
import api from "../../services/api"
// import { Container } from './styles';

export default class main extends Component {
  state = {
    newBox : ''
  };
  handleSubimit = async (e) => {
    e.preventDefault();
    const response = await api.post('boxes',{
      title: this.state.newBox
    });
    this.props.history.push(`box/${response.data._id}`)
    console.log(response.data);
  }

  handleInputChange = (e) =>{
    this.setState({newBox:e.target.value});
  }
  render() {
    return (
        <div id="main-container">
            
            <form onSubmit ={this.handleSubimit}>
              <img src={logo} alt=""/>
              <input placeholder="Criar um box" value = {this.state.newBox} onChange={this.handleInputChange}></input>
              <button type = "submit"> Criar</button>
            </form>
        </div>
    );
  }
}
