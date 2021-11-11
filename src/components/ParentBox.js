import React from 'react'
import Wheel from './wheel';
import { Container, Row, Col } from 'react-grid-system';

import {
    makeStyles,
    CircularProgress,
  } from "@material-ui/core";
  
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "white",
      height: "100vh",
      
    },
    center: {
      margin: "auto",
      width: "30%",
      padding: 10,
    },
  }));

function ParentBox() {
    return (
        <div>
            <Container>
  <Row>
    <Col sm={6} style={{backgroundColor:"red"}}>
    <div className="App">
        <Wheel
          items={this.state.left}
          region={this.props.match.params.region}
          won={this.state.won}
          history={this.props.history}
        />
      </div>
    </Col>
    <Col sm={6} style={{backgroundColor:"blue"}}>
      One of three columns
    </Col>

  </Row>
</Container>

            
        </div>
    )
}

export default ParentBox
