import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Page from "./Page";
import { useHistory } from "react-router-dom";
import mtnlogo from "../ecobank.png";
import axios from "axios";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useAppContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    height: "100vh",
  },
  center: {
    margin: "auto",
    width: "40%",
    padding: 10,
  },
}));

const Firstpage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const context=useAppContext()
  const{dispatch}=context
  const [error, setError] = useState("");
  const history = useHistory();

  
  return (
    <Page className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <div className={classes.center}>
            {" "}
            <img
              className="Header-logo"
              src={mtnlogo}
              width="100px"
              alt="Logo"
            />{" "}
          </div>
          <Formik
            initialValues={{
              pinnumber: "",
            }}
            validationSchema={Yup.object().shape({
              pinnumber: Yup.string().required("Pin number is required"),
            })}
            onSubmit={async (values) => {
              setError("");
              setLoading(true);
              try {
                const username = "username";
                const password = "password";

                const token = Buffer.from(
                  `${username}:${password}`,
                  "utf8"
                ).toString("base64");

                const url = "https://ecobank.agyeikumi.com/ecobank-php-api/customer/login";
                const data = {
                    promoterId:values.pinnumber
                };

                const response =await axios.post(url, data, {
                  headers: {
                    Authorization: `Basic ${token}`,
                  },
                });

                if (response.data.statusCode===100){
                    setError(response.data.message)
                }
                else if(response.data.statusCode===200){
                    dispatch({
                        type:'SETID',
                        payload:values.pinnumber
                    });

                    dispatch({
                        type:'SETUSER',
                        payload:{...response.data.response[0]}
                    });

                    history.push('/wheel')

                    

                }

                

               
              } catch (error) {
                console.log(error.response.data);
                // dispatch({ type: "SIGN_IN", error: error.response });
                setError("Email or password not correct");
                setLoading(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                {error ? (
                  <Box mt={3} mb={1} p={2} bgcolor="error.main">
                    <Typography
                      align="center"
                      // color="primary"

                      variant="body1"
                      style={{ color: "white" }}
                    >
                      {error}
                    </Typography>
                  </Box>
                ) : null}
                <TextField
                  type="number"
                  error={Boolean(touched.pinnumber && errors.pinnumber)}
                  fullWidth="true"
                  helperText={touched.pinnumber && errors.pinnumber}
                  label="Enter your pin"
                  margin="normal"
                  name="pinnumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pinnumber}
                  variant="outlined"
                />
                {/* <TextField
                  type="number"
                  error={Boolean(touched.confirmnumber && errors.confirmnumber)}
                  fullWidth
                  helperText={touched.confirmnumber && errors.confirmnumber}
                  label="Confirm Phone Number"
                  margin="normal"
                  name="confirmnumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmnumber}
                  variant="outlined"
                /> */}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Send {loading ? <CircularProgress /> : null}
                  </Button>
                </Box>

                {/* <Typography color="textSecondary" variant="body1">
                  Forgort password?{' '}
                  <Link to="/password-reset" variant="h6">
                    Reset
                  </Link>
                </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default Firstpage;
