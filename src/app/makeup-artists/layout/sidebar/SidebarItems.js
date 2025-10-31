<<<<<<< Updated upstream
import React from "react";
=======
import React, { useEffect } from "react";
>>>>>>> Stashed changes
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useApp } from "@muahub/app/contexts/AppContext";
import { ROLE_MANAGER } from "@muahub/constants/System";
<<<<<<< Updated upstream

=======
import { useRouter } from "next/navigation";
>>>>>>> Stashed changes
const SidebarItems = ({ toggleMobileSidebar }) => {
  const { currentUser } = useApp();
  const pathname = usePathname();
  const pathDirect = pathname;
<<<<<<< Updated upstream

  if (currentUser.role === ROLE_MANAGER.SALE && !currentUser.payment_type) {
    if (pathname !== "/makeup-artists/thanh-toan-nen-tang") {
      if (typeof window !== "undefined") {
        window.location.href = "/makeup-artists/thanh-toan-nen-tang";
      }
      return null;
    }
=======
  const router = useRouter();
  useEffect(() => {
    if (
      currentUser.role === ROLE_MANAGER.MUA &&
      !currentUser.payment_type &&
      pathname !== "/makeup-artists/thanh-toan-nen-tang"
    ) {
      router.push("/makeup-artists/thanh-toan-nen-tang");
    }
  }, [currentUser, pathname, router]);

  if (
    currentUser.role === ROLE_MANAGER.MUA &&
    !currentUser.payment_type &&
    pathname === "/makeup-artists/thanh-toan-nen-tang"
  ) {
>>>>>>> Stashed changes
    return (
      <Box sx={{ px: 3 }}>
        <div style={{ padding: "16px", textAlign: "center", color: "#888" }}>
          Vui lòng lựa chọn gói admin để tiếp tục sử dụng chức năng này.
        </div>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.onlyUser && currentUser.role === ROLE_MANAGER.ADMIN) {
            return null;
          }
<<<<<<< Updated upstream
          if (item.onlyAdmin && currentUser.role === ROLE_MANAGER.SALE) {
=======
          if (item.onlyAdmin && currentUser.role === ROLE_MANAGER.MUA) {
>>>>>>> Stashed changes
            return null;
          }
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
