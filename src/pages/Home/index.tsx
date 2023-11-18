import { auth } from "../../firebase";
import { useUserStore } from "../../stores/UserStore";

export default function Home() {
  const logOut = useUserStore((state) => state.logOut);
  const signOut = useUserStore((state) => state.signOut);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log(auth);
          logOut();
          signOut(auth);
          window.localStorage.removeItem("accessToken");
        }}
      >
        LogOut
      </button>
      <h1>Home Page</h1>
      <h3>Hi </h3>
    </>
  );
}
