"use client";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useState } from "react";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import { useApp } from "@quanlysanbong/app/contexts/AppContext";
=======
import { useState, useEffect } from "react";
import { Tab, Tabs, Form, Button, Modal } from "react-bootstrap";
import { useApp } from "@muahub/app/contexts/AppContext";
>>>>>>> Stashed changes
import UpdateProfileComponent from "./UpdateProfileComponent";
import toast from "react-hot-toast";
import SendRequest from "@quanlysanbong/utils/SendRequest";
import { ROLE_MANAGER } from "@quanlysanbong/constants/System";
=======
=======
>>>>>>> Stashed changes
import { useState } from "react";
import { Tab, Tabs, Form, Button } from "react-bootstrap";
import { useApp } from "@muahub/app/contexts/AppContext";
import UpdateProfileComponent from "./UpdateProfileComponent";
import UpdateMakeupArtistProfileComponent from "./UpdateMakeupArtistProfileComponent";
import toast from "react-hot-toast";
import SendRequest from "@muahub/utils/SendRequest";
import { ROLE_MANAGER } from "@muahub/constants/System";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import HistoryBookingComponent from "./HistoryBookingComponent";
import { Alert, AlertTitle, Stack } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import EmailIcon from "@mui/icons-material/Email";
import { ArrowCircleDownOutlined, ExpandCircleDownOutlined, MailOutlined } from "@mui/icons-material";
import HistoryBankComponent from "./HistoryBankComponent";

const UserProfileComponent = () => {
  const { currentUser, updateUser } = useApp();
  const [key, setKey] = useState("account");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeProfileData, setUpgradeProfileData] = useState(null); // optional, for collecting profile data
  const [isPending, setIsPending] = useState(false);
  // Kiểm tra trạng thái pending khi vào tab "Yêu cầu nâng cấp"
  useEffect(() => {
    if (key === "upgrade" && currentUser && currentUser._id) {
      fetch(`/api/request-add-MUA/check-pending/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setIsPending(!!data.isPending);
        })
        .catch(() => {
          setIsPending(false);
        });
    }
  }, [key, currentUser]);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới không khớp.");
      return;
    }
    const res = await SendRequest("PUT", "/api/users", {
      id: currentUser._id,
      password: passwordData.newPassword,
      currentPassword: passwordData.currentPassword
    });
    if (res.payload) {
      toast.success("Cập nhật mật khẩu thành công.");
    } else {
      toast.error("Cập nhật mật khẩu thất bại.");
    }
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

<<<<<<< Updated upstream
<<<<<<< Updated upstream

  // Khi nhấn nút gửi yêu cầu nâng cấp, mở modal
  const handleUpgradeRequest = () => {
    setShowUpgradeModal(true);
  };

  // Hàm gửi yêu cầu nâng cấp sau khi user submit form trong modal
  const handleUpgradeProfileSubmit = async (profileData) => {
    try {
      // Kiểm tra xem đã có yêu cầu pending chưa
      const checkRes = await fetch(`/api/request-add-MUA?email=${currentUser.email}`);
=======
=======
>>>>>>> Stashed changes
  const handleUpgradeRequest = async () => {
    try {
      // Kiểm tra xem đã có yêu cầu pending chưa
      const checkRes = await fetch(`/api/request-add-sale?email=${currentUser.email}`);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      const checkData = await checkRes.json();
      const isPending = checkData.data?.some((item) => item.email === currentUser.email && item.status === "pending");
      if (isPending) {
        toast("Bạn đã gửi yêu cầu nâng cấp trước đó. Vui lòng chờ xác nhận từ quản trị viên.");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        setShowUpgradeModal(false);
        return;
      }

      // Gửi thông tin hồ sơ + yêu cầu nâng cấp
      const res = await fetch("/api/request-add-MUA", {
=======
=======
>>>>>>> Stashed changes
        return;
      }

      // Nếu chưa có thì gửi yêu cầu mới
      const res = await fetch("/api/request-add-sale", {
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          email: currentUser.email,
          profile: profileData // gửi kèm thông tin hồ sơ
=======
          email: currentUser.email
>>>>>>> Stashed changes
=======
          email: currentUser.email
>>>>>>> Stashed changes
        })
      });
      const data = await res.json();
      if (data.success) toast.success(data.message);
      else toast.error(data.message || "Gửi yêu cầu thất bại!");
    } catch {
      toast.error("Gửi yêu cầu thất bại!");
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    setShowUpgradeModal(false);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  };

  return (
    <div className="container my-4">
      <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="account" title="Cập nhật tài khoản">
          <UpdateProfileComponent currentUser={currentUser} updateUser={updateUser} />
        </Tab>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
              
        {/* Tab cập nhật hồ sơ chuyên gia cho MUA */}
        {currentUser.role === "makeup_artist" && (
          <Tab eventKey="mua-profile" title="Cập nhật hồ sơ chuyên gia">
            <UpdateMakeupArtistProfileComponent currentUser={currentUser} />
          </Tab>
        )}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

        <Tab eventKey="password" title="Cập nhật mật khẩu">
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cập nhật mật khẩu
            </Button>
          </Form>
        </Tab>

        {currentUser.role === ROLE_MANAGER.USER && (
          <Tab eventKey="empty" title="Lịch sử đặt dịch vụ">
            <HistoryBookingComponent currentUser={currentUser} />
          </Tab>
        )}

        <Tab eventKey="backs" title="Lịch sử trả tiền">
          <HistoryBankComponent currentUser={currentUser} />
        </Tab>

        {currentUser.role === ROLE_MANAGER.USER && (
          <Tab eventKey="upgrade" title="Yêu cầu nâng cấp">
            <div className="mt-3">
              {currentUser.active ? (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                isPending ? (
                  <Alert severity="info" className="mb-3">
                    <AlertTitle>
                      <UpgradeIcon fontSize="small" /> Yêu cầu nâng cấp đang chờ duyệt
                    </AlertTitle>
                    <p>Bạn đã gửi yêu cầu nâng cấp và đang chờ quản trị viên xác nhận. Vui lòng chờ phản hồi.</p>
                  </Alert>
                ) : (
                  <Alert severity="info" className="mb-3">
                    <AlertTitle>
                      <UpgradeIcon fontSize="small" /> Yêu cầu nâng cấp thành Chủ dịch vụ
                    </AlertTitle>
                    <p>Nếu bạn muốn trở thành quản lý/chủ dịch vụ trên hệ thống, vui lòng gửi yêu cầu xác nhận và cập nhật hồ sơ chuyên gia.</p>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<UpgradeIcon />}
                        onClick={handleUpgradeRequest}
                      >
                        Gửi yêu cầu nâng cấp
                      </Button>
                    </div>
                  </Alert>
                )
=======
=======
>>>>>>> Stashed changes
                <Alert severity="info" className="mb-3">
                  <AlertTitle>
                    <UpgradeIcon fontSize="small" /> Yêu cầu nâng cấp thành Chủ dịch vụ
                  </AlertTitle>
                  <p>Nếu bạn muốn trở thành quản lý/chủ dịch vụ trên hệ thống, vui lòng gửi yêu cầu xác nhận.</p>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<UpgradeIcon />}
                      onClick={handleUpgradeRequest}
                    >
                      Gửi yêu cầu nâng cấp
                    </Button>
                  </div>
                </Alert>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              ) : (
                <Alert severity="warning">
                  <AlertTitle>
                    <EmailIcon fontSize="small" /> Tài khoản chưa xác thực
                  </AlertTitle>
                  <p>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    Bạn cần xác minh tài khoản để gửi yêu cầu nâng cấp. Vui lòng kiểm tra email xác nhận và làm theo hướng dẫn.
                  </p>
                </Alert>
              )}
              {/* Modal cập nhật hồ sơ chuyên gia khi gửi yêu cầu nâng cấp */}
              <Modal show={showUpgradeModal} onHide={() => setShowUpgradeModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>Cập nhật hồ sơ chuyên gia trước khi gửi yêu cầu nâng cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UpdateMakeupArtistProfileComponent
                    currentUser={currentUser}
                    onSubmit={handleUpgradeProfileSubmit}
                    isUpgradeRequest={true}
                  />
                </Modal.Body>
              </Modal>
=======
=======
>>>>>>> Stashed changes
                    Bạn cần xác minh tài khoản để gửi yêu cầu nâng cấp. Vui lòng kiểm tra email xác nhận và làm theo
                    hướng dẫn.
                  </p>
                </Alert>
              )}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfileComponent;
