import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useUserStore } from "../stores/UserStore";
export default function Header() {
  const currentUserImg = useUserStore((state) => state.currentUserImg);
  const waitingMenus = useUserStore((state) => state.waitingMenus);
  const invitations = useUserStore((state) => state.invitations);
  const logOut = useUserStore((state) => state.logOut);
  const signOut = useUserStore((state) => state.signOut);
  const navigate = useNavigate();
  const calculateTotalMessage = () => {
    const result = invitations.length + waitingMenus.length;
    // setTotalMessage(result);
    return result;
  };
  // const [totalMessage, setTotalMessage] = useState(0);
  // useEffect(() => {
  //   calculateTotalMessage();
  // });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Collapsible wrapper */}
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <a
            className="navbar-brand mt-lg-0 mt-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          {/* Left links */}
          <ul className="navbar-nav mb-lg-0 mb-2 me-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/inbody");
                }}
              >
                InBody
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/training");
                }}
              >
                Training
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Projects
              </a>
            </li>
          </ul>
          {/* //Left links */}
        </div>
        {/* //Collapsible wrapper //Right elements */}
        <div className="d-flex align-items-center">
          {/* //Icon */}
          <div
            className="text-reset me-3"
            onClick={async () => {
              await signOut(auth);
              alert("已登出");
              logOut();
            }}
          >
            <i className="fas fa-arrow-right-from-bracket"></i>
          </div>
          {/* //Notifications */}
          <div className="dropdown">
            <a
              className="text-reset dropdown-toggle hidden-arrow me-3"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                {calculateTotalMessage() !== 0 ? calculateTotalMessage() : null}
              </span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Some news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          {/* //Avatar */}
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={
                  currentUserImg
                    ? currentUserImg
                    : `https://i.pravatar.cc/150?u=${localStorage.getItem(
                        "UID",
                      )}`
                }
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* //Right elements */}
      </div>
      {/* //Container wrapper */}
    </nav>
  );
}
