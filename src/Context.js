import React, { Component, useContext } from "react";


const Context = React.createContext();

class Provider extends Component {
  reducer = (state, action) => {
    switch (action.type) {
     
      case "SETACTIVE":      
        return {
          ...state,
          activeproducts: action.payload,
        };

        case "SETID":      
        return {
          ...state,
          promoterid: action.payload,
        };

        case "SETUSER":      
        return {
          ...state,
          user: action.payload,
        };


      default:
        return state;
    }
  };
  state = {
    user: null,
    error: "",
    shopid:"",
    promoterid:"",
    isLoggedIn: false,
    wonproducts:[],
    activeproducts:null,
    dispatch: (action) => {
      this.setState((state) => this.reducer(state, action));
    },
  };

  

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
