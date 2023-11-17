import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { auth } from "../../firebase";
interface signUpData {
  email: string;
  password: string;
  role: number;
}
async function handleSignUp(signUpData: signUpData) {
  console.log("signUpData", signUpData);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password,
      signUpData.role
    );

    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

export default function SignIn() {
  const initialState: signUpData = {
    email: "",
    password: "",
    role: 0,
  };
  const [signUpData, setSignUpData] = useState(initialState);
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              <MDBRadio
                name="role"
                value={0}
                label="Coach"
                inline
                onChange={(e) => {
                  const newData = {
                    ...signUpData,
                    role: Number(e.target.value),
                  };
                  setSignUpData(newData);
                }}
              />
              <MDBRadio
                name="role"
                value={1}
                label="Student"
                inline
                onChange={(e) => {
                  const newData = {
                    ...signUpData,
                    role: Number(e.target.value),
                  };
                  setSignUpData(newData);
                }}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                type="email"
                size="lg"
                onChange={(e) => {
                  const newData = { ...signUpData, email: e.target.value };
                  setSignUpData(newData);
                }}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                type="password"
                size="lg"
                onChange={(e) => {
                  const newData = { ...signUpData, password: e.target.value };
                  setSignUpData(newData);
                }}
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={() => handleSignUp(signUpData)}
              >
                Sign Up
              </MDBBtn>
              <MDBBtn outline className="mx-2 px-5" color="white" size="lg">
                Login
              </MDBBtn>

              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="#!" className="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
