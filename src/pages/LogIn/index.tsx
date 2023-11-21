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
import { auth, db, googleProvider } from "../../firebase";
import { useUserStore } from "../../stores/UserStore";
import { Loading } from "../LogIn/Loading";

export default function LogIn() {
  const {
    signUpRole,
    signUp,
    signUpEmail,
    signUpPassword,
    selectRole,
    keyInEmail,
    keyInPassWord,
    googleLogin,
    nativeLogin,
    getAuth,
  } = useUserStore();
  async function handleGoogleLogin() {
    if (signUpRole !== 0) {
      googleLogin(auth, googleProvider);
      getAuth(auth, db);
    } else {
      alert("Plz select a role");
    }
  }

  return (
    <>
      <Loading />
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
                  label="Coach"
                  // value 1 means is coach
                  value={1}
                  inline
                  onChange={(e) => {
                    selectRole(Number(e.target.value));
                  }}
                />
                <MDBRadio
                  name="role"
                  label="Student"
                  // value 2 means is student
                  value={2}
                  inline
                  onChange={(e) => {
                    selectRole(Number(e.target.value));
                  }}
                />

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
                  onClick={() => {
                    if (signUpRole !== 0) {
                      signUp(auth, signUpEmail, signUpPassword);
                    } else {
                      alert("Plz select a role");
                    }
                  }}
                >
                  Sign Up
                </MDBBtn>
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={() => {
                    if (signUpRole !== 0) {
                      nativeLogin(auth, signUpEmail, signUpPassword);
                      getAuth(auth, db);
                    } else {
                      alert("Plz select a role");
                    }
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
    </>
  );
}
