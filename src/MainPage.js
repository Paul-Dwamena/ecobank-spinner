import React,{useEffect,useState} from "react";
import Wheel from "./components/wheel";
import "./styles.css";
import axios from 'axios'
import { useAppContext } from "./Context";
import { useHistory } from "react-router-dom";

const  MainPage =()=> {

  const context=useAppContext()
  const {activeproducts,user}=context

  const{PromoterId,ShopId}=user
  const [left,setleft]=useState([])
  const [won,setWon]=useState([])
  const history=useHistory()



  useEffect(() => {
  const getallpreminums=async()=>{
    try {
      const username = "username";
      const password = "password";

      const token = Buffer.from(
        `${username}:${password}`,
        "utf8"
      ).toString("base64");

      const url = "https://ecobank.agyeikumi.com/ecobank-php-api/customer/getAllActivePremiums";
      const data = {
          promoterId:PromoterId
      };

      const response =await axios.post(url, data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (response.data.statusCode===100){
          console.log(response.data.message)
      }
      else if(response.data.statusCode===200){
          setleft(response.data.response.getAllActivePremiums)
          setWon(response.data.response.getAllWonPremiums || [])
        
      }

      

     
    } catch (error) {
      console.log(error.response.data);
      // dispatch({ type: "SIGN_IN", error: error.response });
  
    }


  }
  getallpreminums()


    
     
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

 
  
  
  
  

    return (
      <div className="App">
        <Wheel
          items={left}
          won={won}
          shopid={ShopId}
          promoterid={PromoterId}
          history={history}
        /> 
      </div>
    );

}

export default MainPage
