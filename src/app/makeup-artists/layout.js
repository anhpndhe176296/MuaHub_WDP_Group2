"use client";

import RootAdminLayout from "./LayoutComponent";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { baselightTheme } from "./layout/theme/DefaultColors";
import { usePathname } from "next/navigation";
import LoadingFullScreen from "./components/Loading/LoadingFullScreen";
import "./baseCss.css";
import { useApp } from "../contexts/AppContext";
import { ROLE_MANAGER } from "@muahub/constants/System";
import { useRouter } from "next/navigation";
const AdminLayout = ({ children }) => {
  const { currentUser, loading } = useApp();
  const pathUrl = usePathname();
<<<<<<< Updated upstream
  const router = useRouter();

  if (currentUser.role === ROLE_MANAGER.USER) {
    router.push("/");
=======
<<<<<<< Updated upstream

  if (currentUser.role === ROLE_MANAGER.USER) {
    window.location.href = "/";
=======
  const router = useRouter();
<<<<<<< Updated upstream

  if (currentUser.role === ROLE_MANAGER.USER) {
=======
console.log("Current User in Makeup Artists Layout:", currentUser);
  if (currentUser?.role === ROLE_MANAGER.USER) {
>>>>>>> Stashed changes
    router.push("/");
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    return;
  }

  // const url = ["/dang-nhap", "/dang-ky"];

<<<<<<< Updated upstream
  if (!loading && Object.keys(currentUser).length === 0 && !url.includes(pathUrl)) {
    router.push("/makeup-artists/dang-nhap");
    return;
  }
=======
  // if (!loading && !currentUser?.role && !url.includes(pathUrl)) {
  //   router.push("/dang-nhap");
  //   return;
  // }
>>>>>>> Stashed changes

  return (
    <ThemeProvider theme={baselightTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {loading ? (
        <div className="loading position-fixed" id="loading-full-screen">
          <LoadingFullScreen />
        </div>
      ) : pathUrl === "/makeup-artists/dang-nhap" || pathUrl === "/makeup-artists/dang-ky" ? (
        <>{children}</>
      ) : (
        <RootAdminLayout>{children}</RootAdminLayout>
      )}

      <div className="loading position-fixed" id="loading-full-screen">
        <LoadingFullScreen />
        <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"></a>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default AdminLayout;
