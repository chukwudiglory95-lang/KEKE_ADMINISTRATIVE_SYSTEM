import { Outlet } from "react-router-dom";
import "../../styles/contentwrapper.css";

export default function ContentWrapper() {
  return (
    <div className="content-wrapper">
      {/* Whichever page is active (Dashboard, Members, Payments, etc.) renders here */}
      <Outlet />
    </div>
  );
}