import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../firebase";
import { useUserStore } from "../../stores/UserStore";

export default function LogIn() {
  const navigate = useNavigate();
  const {
    signUpEmail,
    signUpPassword,
    keyInEmail,
    keyInPassWord,
    googleLogin,
    nativeLogin,
    getAuth,
  } = useUserStore();
  async function handleGoogleLogin() {
    googleLogin(auth, googleProvider);
    getAuth(auth, db);
  }

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark mx-auto my-5 text-white"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="d-flex flex-column align-items-center w-100 mx-auto p-5">
                <h2 className="fw-bold text-uppercase mb-2">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="signUpEmail"
                  type="email"
                  size="lg"
                  style={{ color: "white" }}
                  onChange={(e) => {
                    keyInEmail(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="signUpPassword"
                  type="password"
                  size="lg"
                  style={{ color: "white" }}
                  onChange={(e) => {
                    keyInPassWord(e.target.value);
                  }}
                />

                <p className="small pb-lg-2 mb-3">
                  <a className="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={() => {
                    nativeLogin(auth, signUpEmail, signUpPassword);
                    getAuth(auth, db);
                  }}
                >
                  Login
                </MDBBtn>
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={() => {
                    handleGoogleLogin();
                  }}
                >
                  Google Login
                </MDBBtn>

                <div className="d-flex mb-5 mt-3 flex-row">
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
                    <a
                      className="text-white-50 fw-bold"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
