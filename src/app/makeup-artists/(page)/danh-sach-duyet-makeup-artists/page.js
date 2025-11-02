"use client";

import { useCallback, useEffect, useState } from "react";
<<<<<<< Updated upstream
import {
  Box,
=======
 import { Box,
>>>>>>> Stashed changes
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
<<<<<<< Updated upstream
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip
} from "@mui/material";
=======
  Modal,
  Chip,
  TextField
} from "@mui/material";
import UpdateMakeupArtistProfileComponent from "../../../(marketing)/components/UpdateMakeupArtistProfileComponent";
>>>>>>> Stashed changes
import SendRequest from "@muahub/utils/SendRequest";
import PageContainer from "../../components/container/PageContainer";
import { convertDateTime } from "@muahub/utils/Main";
import { ROLE_MANAGER } from "@muahub/constants/System";
import toast from "react-hot-toast";

<<<<<<< Updated upstream
const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [MUARequests, setMUARequests] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    user: null,
    action: null
  });
=======
const UserListUpgradeToOwnerPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [MUARequests, setMUARequests] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelReason, setShowCancelReason] = useState(false);
>>>>>>> Stashed changes

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const [userRes, MUAReqRes] = await Promise.all([
        SendRequest("GET", "/api/users", { role: ROLE_MANAGER.USER }),
        fetch("/api/request-add-MUA").then((r) => r.json())
      ]);
<<<<<<< Updated upstream
      if (userRes.payload) setUsers(userRes.payload);
=======

      if (userRes.payload) {
        // Lấy ra các user có yêu cầu nâng cấp lên chủ dịch vụ makeup
        const usersWithRequests = userRes.payload.filter((user) =>
          MUAReqRes.data.some((req) => req.email === user.email && req.status === "pending")
        );

        setUsers(usersWithRequests);
      }
>>>>>>> Stashed changes
      if (MUAReqRes.success) setMUARequests(MUAReqRes.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReload = () => {
    fetchData();
  };

<<<<<<< Updated upstream
  // Duyệt đơn: cập nhật role và xoá request
  const handleApprove = async (user) => {
    try {
      // 1. Cập nhật role user
      await SendRequest("PUT", "/api/users", {
        id: user._id,
        role: "MUA"
      });
      // 2. Xoá request khỏi MUA_requests
      await fetch("/api/request-add-MUA", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email })
      });
=======
  // Khi ấn Duyệt, mở modal xem profile
  const handleApproveClick = (user) => {
    setSelectedUser(user);
    setShowApproveModal(true);
    setShowCancelReason(false);
    setCancelReason("");
  };

  // Xác nhận duyệt đơn
  const handleApproveConfirm = async () => {
    if (!selectedUser) return;
    try {
      await SendRequest("PUT", "/api/users", {
        id: selectedUser._id,
        role: "makeup_artist"
      });
      await fetch("/api/request-add-MUA", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedUser.email, name: selectedUser.name, phone: selectedUser.phone, address: selectedUser.address })
      });
      setShowApproveModal(false);
      setSelectedUser(null);
>>>>>>> Stashed changes
      fetchData();
    } catch (err) {
      alert("Có lỗi khi duyệt đơn!");
    }
  };

<<<<<<< Updated upstream
  // Khóa/Mở khóa tài khoản
  const handleToggleAccountStatus = (user) => {
    const action = user.status === false ? "unlock" : "lock";
    setConfirmDialog({
      open: true,
      user: user,
      action: action
    });
  };

  const confirmToggleStatus = async () => {
    try {
      const { user, action } = confirmDialog;
      const newStatus = action === "lock" ? false : true;

      const response = await SendRequest("PUT", "/api/users", {
        id: user._id,
        active: newStatus
      });

      if (response) {
        // Cập nhật local state
        setUsers((prevUsers) => prevUsers.map((u) => (u._id === user._id ? { ...u, status: newStatus } : u)));
        toast.success(action === "lock" ? "Đã khóa tài khoản thành công!" : "Đã mở khóa tài khoản thành công!");
      } else {
        toast.error(response.error || "Có lỗi xảy ra khi gửi phản hồi");
      }
    } catch (error) {
      console.error("Error updating account status:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái tài khoản");
    } finally {
      setConfirmDialog({ open: false, user: null, action: null });
    }
  };

  const cancelToggleStatus = () => {
    setConfirmDialog({ open: false, user: null, action: null });
  };

  // Kiểm tra user có đơn pending không
  const hasPendingRequest = (email) => MUARequests.some((req) => req.email === email && req.status === "pending");
=======
  // Hủy duyệt đơn
  const handleCancelRequest = async () => {
    if (!selectedUser) return;
    if (!cancelReason.trim()) {
      toast.error("Vui lòng nhập lý do hủy!");
      return;
    }
    try {
      // Gửi lý do hủy (có thể cần API riêng, ví dụ PATCH hoặc POST log...)
      await fetch("/api/request-add-MUA", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedUser.email, status: "rejected", reason: cancelReason })
      });
      setShowApproveModal(false);
      setSelectedUser(null);
      setCancelReason("");
      setShowCancelReason(false);
      fetchData();
    } catch (err) {
      alert("Có lỗi khi hủy đơn!");
    }
  };


  // Kiểm tra trạng thái đơn
  const getRequestStatus = (email) => {
    const req = MUARequests.find((r) => r.email === email);
    return req ? req.status : null;
  };
  const getRequestReason = (email) => {
    const req = MUARequests.find((r) => r.email === email);
    return req && req.status === "rejected" ? req.reason : null;
  };
  const hasPendingRequest = (email) => getRequestStatus(email) === "pending";
>>>>>>> Stashed changes

  // Render trạng thái tài khoản
  const renderAccountStatus = (status) => {
    return (
      <Chip
        label={status === false ? "Đã khóa" : "Hoạt động"}
        color={status === false ? "error" : "success"}
        size="small"
      />
    );
  };

  return (
<<<<<<< Updated upstream
    <PageContainer title="Danh sách người dùng" description="Danh sách tất cả người dùng trong hệ thống">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Danh sách người dùng</Typography>
=======
    <PageContainer
      title="Danh sách duyệt chủ dịch vụ makeup"
      description="Danh sách tất cả người dùng yêu cầu nâng cấp lên chủ dịch vụ makeup"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Danh sách người dùng yêu cầu nâng cấp lên chủ dịch vụ makeup</Typography>
>>>>>>> Stashed changes
        <Button variant="contained" color="primary" onClick={handleReload}>
          Tải lại
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Điện thoại</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Ngày đăng ký</TableCell>
                <TableCell>Trạng thái</TableCell>
<<<<<<< Updated upstream
                {/* <TableCell>Duyệt đơn</TableCell> */}
                <TableCell>Thao tác</TableCell>
=======
                <TableCell>Duyệt đơn</TableCell>
>>>>>>> Stashed changes
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img src={user.avatar || "/img/carousel.jpg"} alt={user.name} width="50" height="50" />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{convertDateTime(user.created_at)}</TableCell>
                  <TableCell>{renderAccountStatus(user.status)}</TableCell>
<<<<<<< Updated upstream
                  {/* <TableCell>
                    {hasPendingRequest(user.email) ? (
                      <Button variant="contained" color="success" size="small" onClick={() => handleApprove(user)}>
                        Duyệt
                      </Button>
                    ) : (
                      <span style={{ color: "#aaa" }}>-</span>
                    )}
                  </TableCell> */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.status === false ? "success" : "error"}
                      size="small"
                      onClick={() => handleToggleAccountStatus(user)}
                    >
                      {user.status === false ? "Mở khóa" : "Khóa tài khoản"}
                    </Button>
                  </TableCell>
=======
                  <TableCell>
                    {getRequestStatus(user.email) === "pending" ? (
                      <Button variant="contained" color="success" size="small" onClick={() => handleApproveClick(user)}>
                        Duyệt
                      </Button>
                    ) : getRequestStatus(user.email) === "rejected" ? (
                      <>
                        <Chip label="Đã từ chối" color="error" size="small" />
                        {getRequestReason(user.email) && (
                          <div style={{ color: '#b71c1c', fontSize: 12, marginTop: 4 }}>
                            Lý do: {getRequestReason(user.email)}
                          </div>
                        )}
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>-</span>
                    )}
                  </TableCell>
      {/* Modal duyệt đơn và xem profile */}
      <Modal open={showApproveModal} onClose={() => { setShowApproveModal(false); setShowCancelReason(false); }} maxWidth="md">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
          <Typography variant="h6" mb={2}>Thông tin hồ sơ chuyên gia</Typography>
          {selectedUser && (
            <UpdateMakeupArtistProfileComponent currentUser={selectedUser} readOnly />
          )}
          {/* Nếu đơn đã bị từ chối, hiển thị lý do */}
          {selectedUser && getRequestStatus(selectedUser.email) === "rejected" && (
            <Box mt={2} color="#b71c1c">
              <Chip label="Đã từ chối" color="error" size="small" />
              {getRequestReason(selectedUser.email) && (
                <div style={{ fontSize: 14, marginTop: 4 }}>
                  Lý do từ chối: {getRequestReason(selectedUser.email)}
                </div>
              )}
            </Box>
          )}
          {/* Nếu đơn đang pending thì cho phép duyệt/hủy */}
          {selectedUser && getRequestStatus(selectedUser.email) === "pending" && (
            <Box mt={3} display="flex" gap={2}>
              {!showCancelReason ? (
                <>
                  <Button variant="contained" color="success" onClick={handleApproveConfirm}>Xác nhận duyệt</Button>
                  <Button variant="outlined" color="error" onClick={() => setShowCancelReason(true)}>Hủy đơn</Button>
                  <Button variant="text" onClick={() => { setShowApproveModal(false); setShowCancelReason(false); }}>Đóng</Button>
                </>
              ) : (
                <Box width="100%">
                  <TextField
                    label="Lý do hủy đơn"
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" gap={2}>
                    <Button variant="contained" color="error" onClick={handleCancelRequest}>Xác nhận hủy</Button>
                    <Button variant="text" onClick={() => setShowCancelReason(false)}>Quay lại</Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Modal>
>>>>>>> Stashed changes
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
<<<<<<< Updated upstream

      {/* Dialog xác nhận */}
      <Dialog
        open={confirmDialog.open}
        onClose={cancelToggleStatus}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {confirmDialog.action === "lock" ? "Xác nhận khóa tài khoản" : "Xác nhận mở khóa tài khoản"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Bạn có chắc chắn muốn {confirmDialog.action === "lock" ? "khóa" : "mở khóa"} tài khoản của{" "}
            <strong>{confirmDialog.user?.name}</strong> ({confirmDialog.user?.email})?
            {confirmDialog.action === "lock" && (
              <span style={{ color: "red" }}> Người dùng sẽ không thể đăng nhập sau khi bị khóa. </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelToggleStatus} color="primary">
            Hủy
          </Button>
          <Button
            onClick={confirmToggleStatus}
            color={confirmDialog.action === "lock" ? "error" : "success"}
            variant="contained"
          >
            {confirmDialog.action === "lock" ? "Khóa" : "Mở khóa"}
          </Button>
        </DialogActions>
      </Dialog>
=======
>>>>>>> Stashed changes
    </PageContainer>
  );
};

<<<<<<< Updated upstream
export default UserListPage;
=======
export default UserListUpgradeToOwnerPage;
>>>>>>> Stashed changes
