import { purple } from "@material-ui/core/colors";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import mtnlogo from "./79952-successful.gif";

export default class SuccessPage extends Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-sm bg-light">
          <ul className="navbar-nav">
            <li className="nav-link">
              <Link to="/wheel">
                <i className="fa fa-home" ></i> <span style={{display:"block",backgroundColor:"#3f51b5",padding:10,color:"white",borderRadius:5}}>Home</span>
              </Link>
            </li>
          </ul>
        </nav>
        <h3 style={{ color: "purple",textAlign:"center",marginTop:"140px" }}>
          Congratulations You have won a{" "}
          <b style={{ color: "#3f51b5", fontWeight: "bolder", fontSize: "40px" }}>
            {" "}
            {this.props.match.params.item}
          </b>{" "}
        </h3>

        <div style={{ margin: "auto", width: "80%", }}>
          <img src={mtnlogo} alt="pic" width="300px" />
        </div>
      </div>
    );
  }
}
