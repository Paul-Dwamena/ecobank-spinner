import React from "react";
import "../../index.css";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";


import mtnlogo from "../../ecobank.png";



export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      showform: false,
      lname: "",
      fname: "",
      phone: "",
      shopid: this.props.shopid,
      promoterId: this.props.promoterid,
      location: "",
      prize: "",
      loading: false,
      modalIsOpen: false,
      gender: "",
    };
    this.selectItem = this.selectItem.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  output = () => {
    this.setState({ showform: true, modalIsOpen: true });
    // console.log(this.state.prize);
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const username = "username";
      const password = "password";

      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );

      

      
      const { fname, lname, phone, prize, location, gender } = this.state;
      

      const url =
        "https://ecobank.agyeikumi.com/ecobank-php-api/customer/redeemPremium";
        const userdata = {
          fullname: fname + " " + lname,
          phoneNumber: phone,
          premiumId: prize.PremiumId,
          location,
          shopId: this.props.shopid,
          promoterId: this.props.promoterid,
        };

        const response = await axios.post(url, userdata, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        console.log(response.data)
        
        if (response.data.statusCode=== 200){
          this.setState({ loading: false });
          this.props.history.push(`/success/${prize.PremiumName}`);

        }
      // const resSMS = await axios.post(smsurl, userdata);
      // console.log(resSMS.data);
      // const resEmail = await axios.post(emailUrl, userdata);
      //console.log(resEmail.data);

    
    } catch (error) {
      console.log(error);

      this.setState({ loading: false });
      // console.log(this.props.history);
    }
  };

  handleClose = () => {
    this.setState({ modalIsOpen: false });
  };
  modal = () => {
    const { fname, lname, phone, location, modalIsOpen, gender } = this.state;

    return (
      <Modal show={modalIsOpen} style={{ width: "98%" }}>
        <form onSubmit={this.onSubmit} className="">
          <Modal.Header>
            <h5
              className="modal-title"
              id="addOwnerModalText"
              style={{ color: "black" }}
            >
              Congratulations on winning your{" "}
              <b style={{ color: "red", fontWeight: "bold" }}>
                {this.state.prize.PremiumName}
              </b>
              . fill the form below to claim your prize
            </h5>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputOne" className="col-form-label">
                      First Name:
                    </label>
                    <input
                      id="inputOne"
                      value={fname}
                      onChange={this.onChange}
                      name="fname"
                      type="text"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputOne" className="col-form-label">
                      Last Name:
                    </label>
                    <input
                      id="inputOne"
                      value={lname}
                      onChange={this.onChange}
                      name="lname"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <div className="form-group">
                    <label htmlFor="inputTwo" className="col-form-label">
                      Phone Number
                    </label>
                    <input
                      id="inputTwo"
                      value={phone}
                      onChange={this.onChange}
                      name="phone"
                      required
                      type="number"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                {/* <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputThree" className="col-form-label">
                      Age
                    </label>
                    <input
                      id="inputThree"
                      value={age}
                      onChange={this.onChange}
                      name="age"
                      type="text"
                      required
                      className="form-control"
                    />
                  </div>
                </div> */}
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputFour" className="col-form-label">
                      Location:
                    </label>
                    <input
                      id="inputFour"
                      value={location}
                      onChange={this.onChange}
                      name="location"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputFour" className="col-form-label">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={this.onChange}
                      name="gender"
                      required
                      className="form-control"
                    >
                      <option value="">---Select gender---</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* <div className="row">
               
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="inputFour" className="col-form-label">
                      Outlet name
                    </label>
                    <input
                      id="inputFour"
                      value={outletname}
                      onChange={this.onChange}
                      name="outletname"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
             
              </div> */}

              <div className="row"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button> */}

            <button
              id="performSendAction"
              type="submit"
              className="btn btn-primary"
            >
              {this.state.loading ? (
                <span>loading</span>
              ) : (
                <span> Submit Claim</span>
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };
  async selectItem() {
    if (this.props.items.length > 0) {
      if (this.state.selectedItem === null) {
        const selectedItem = Math.floor(
          Math.random() * this.props.items.length
        );
        if (this.props.onSelectItem) {
          await this.props.onSelectItem(selectedItem);
        }
        this.setState({ selectedItem, prize: this.props.items[selectedItem] });
        setTimeout(this.output, 4000);
      } else {
        this.setState({ selectedItem: null });
        setTimeout(this.selectItem, 500);
        //console.log(this.state.selectedItem)
      }
    } else {
      alert("there is no prize to be won");
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";

    return (
      <div style={{ height: "100vh" }}>
        <img
          className="Header-logo"
          src={mtnlogo}
          width="60px"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginRight: "20px",
            marginTop: "10px",
          }}
          alt="Logo"
        />

        {items.length !== 0 ? (
          <div
            className="container"
            style={{ margin: "auto", width: "100%", marginTop: "100px" }}
          >
            <div className="row">
              <div className="col-md-12 text-center">
                <h5
                  className=""
                  style={{ color: "#3f51b5", fontWeight: "bold" }}
                >
                  WIN YOUR PRIZE HERE
                </h5>
              </div>
            </div>

            <div className="row">
              <div className="wheel-container">
                <div
                  className={`wheel ${spinning}`}
                  style={wheelVars}
                  onClick={this.selectItem}
                >
                  {items.map((item, index) => (
                    <div
                      className="wheel-item"
                      key={index}
                      style={{ "--item-nb": index }}
                    >
                      {item.PremiumName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              {this.modal()}
              {/* <div className="col-sm-4">{this.state.showform ? this.form() : null}</div> */}
            </div>
            <div className="row mb-4 ">
              <div className="col-12 text-center">
                <h3 style={{ color: "white" }}> Prizes won</h3>
                <div className="card">
                  <table className="table">
                    <thead>
                      <tr style={{ backgroundColor: "#3f51b5" }}>
                        <th style={{ color: "white" }}>#</th>
                        <th style={{ color: "white" }}>Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.won.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.PremiumName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1
                  className=""
                  style={{ color: "purple", marginTop: "100px" }}
                >
                  All items for this outlet have been won already
                </h1>
              </div>
            </div>

            <div className="row mb-4 ">
              <div className="col-12 text-center">
                <h3 style={{ color: "purple" }}> Prizes won</h3>
                <div className="card">
                  <table className="table">
                    <thead>
                      <tr style={{ backgroundColor: "#3f51b5" }}>
                        <th>#</th>
                        <th>Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.won.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
