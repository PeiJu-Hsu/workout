import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useUserStore } from "../../stores/UserStore";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    signUpRole,
    signUp,
    signUpEmail,
    signUpPassword,
    signUpName,
    signUpImage,
    selectRole,
    keyInEmail,
    keyInPassWord,
    setInputTextToState,
    setSignUpCoach,
    coachList,
    signUpWithCoach,
    getCoachList,
    coachReserve,
    coachCalender,
    uploadImage,
    getUploadImage,
  } = useUserStore();

  useEffect(() => {
    getCoachList().then((res) => {
      if (res) console.log(res);
    });
  }, []);

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
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
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Name"
                  id="signUpName"
                  type="text"
                  size="lg"
                  style={{ color: "white" }}
                  onChange={(e) => {
                    setInputTextToState(e.target.id, e.target.value);
                    console.log(signUpName);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  //   label="image"
                  id="signUpImage"
                  type="file"
                  accept="image/*"
                  size="lg"
                  style={{ color: "white" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      console.log(e.target.files[0]);
                      setInputTextToState(e.target.id, e.target.files[0]);
                      console.log("file2", e.target.files[0]);
                    }
                    console.log("signUpImage", signUpImage);
                  }}
                />
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
                {signUpRole === 1 ? (
                  <>
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Calender link"
                      id="coachCalender"
                      type="test"
                      size="lg"
                      style={{ color: "white" }}
                      onChange={(e) => {
                        setInputTextToState(e.target.id, e.target.value);
                      }}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Reserve Link"
                      id="coachReserve"
                      type="test"
                      size="lg"
                      style={{ color: "white" }}
                      onChange={(e) => {
                        setInputTextToState(e.target.id, e.target.value);
                      }}
                    />
                  </>
                ) : null}
                {signUpRole === 2 ? (
                  <select
                    value={signUpWithCoach.coachId}
                    onChange={(e) => {
                      setSignUpCoach(e.target.value);
                    }}
                  >
                    <option value={"default"} disabled>
                      Choose a Coach
                    </option>
                    {coachList.map((item, index): any => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                    ;
                  </select>
                ) : null}
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={async () => {
                    if (
                      signUpRole === 1 &&
                      signUpName &&
                      coachCalender &&
                      coachReserve
                    ) {
                      await uploadImage(signUpImage, signUpEmail);
                      await getUploadImage(signUpImage, signUpEmail);
                      await signUp(auth, signUpEmail, signUpPassword);
                    } else if (signUpRole === 2 && signUpName) {
                      await uploadImage(signUpImage, signUpEmail);
                      await getUploadImage(signUpImage, signUpEmail);
                      await signUp(auth, signUpEmail, signUpPassword);
                    } else {
                      alert("Plz fill in all the blanks");
                    }
                  }}
                >
                  Sign Up
                </MDBBtn>

                {/* <div className="d-flex flex-row mt-3 mb-5">
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
                </div> */}

                <div>
                  <p className="mb-0">
                    Back to{" "}
                    <a
                      className="text-white-50 fw-bold"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Log In
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
