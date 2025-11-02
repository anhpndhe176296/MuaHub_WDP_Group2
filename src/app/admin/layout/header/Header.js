<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Menu, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
=======
import React, { useState, useEffect, useRef } from "react";
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Menu, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
// import Link from "next/link";
>>>>>>> Stashed changes
// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
const Header = ({ toggleMobileSidebar }) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px"
    }
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary
  }));

  // State cho thông báo
<<<<<<< Updated upstream
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
=======
  const [allNotifications, setAllNotifications] = useState([]); // Tất cả thông báo fetch về
  const [notifications, setNotifications] = useState([]); // Hiển thị từng phần
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(true);
  const menuListRef = useRef(null);
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Lấy tất cả thông báo, không lọc isRead
        const res = await fetch(`/api/notifications/admin`);
        const data = await res.json();
<<<<<<< Updated upstream
        if (data.success) setNotifications(data.data);
      } catch (err) {
        setNotifications([]);
=======
        if (data.success) {
          setAllNotifications(data.data);
          setNotifications(data.data.slice(0, pageSize));
          setPage(1);
          setHasMore(data.data.length > pageSize);
        }
      } catch (err) {
        setAllNotifications([]);
        setNotifications([]);
        setHasMore(false);
>>>>>>> Stashed changes
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

<<<<<<< Updated upstream
=======
  // Khi mở menu, reset lại trang về 1
  useEffect(() => {
    if (anchorEl) {
      setNotifications(allNotifications.slice(0, pageSize));
      setPage(1);
      setHasMore(allNotifications.length > pageSize);
    }
  }, [anchorEl]);

>>>>>>> Stashed changes
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

 const router = useRouter();
  // Hàm đánh dấu đã đọc và chuyển trang với orderId
  const handleReadAndGo = async (item) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item._id })
      });
<<<<<<< Updated upstream
=======
      setAllNotifications((prev) => prev.map((n) => n._id === item._id ? { ...n, isRead: true } : n));
>>>>>>> Stashed changes
      setNotifications((prev) => prev.map((n) => n._id === item._id ? { ...n, isRead: true } : n));
    } catch (e) {}
    if (item.orderId) {
      router.push(`/admin/danh-sach-dat-lich?orderId=${item.orderId}`);
    } else {
      router.push('/admin/danh-sach-dat-lich');
    }
    setAnchorEl(null);
  };

  // Hàm giải phóng thông báo quá hạn
  const handleClearNotifications = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tất cả thông báo quá hạn?')) return;
    try {
      setLoading(true);
      const res = await fetch('/api/notifications', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        // Sau khi xóa, reload lại danh sách
<<<<<<< Updated upstream
        setNotifications((prev) => prev.filter(n => new Date(n.created_at) >= new Date()));
        // Hoặc gọi lại fetchNotifications nếu muốn chắc chắn
        // fetchNotifications();
=======
        setAllNotifications((prev) => prev.filter(n => new Date(n.created_at) >= new Date()));
        setNotifications((prev) => prev.filter(n => new Date(n.created_at) >= new Date()));
>>>>>>> Stashed changes
      }
    } catch (e) {} finally {
      setLoading(false);
    }
  };

<<<<<<< Updated upstream
=======
  // Infinite scroll: khi kéo tới cuối menu, tự động load thêm
  const handleMenuScroll = (e) => {
    const el = e.target;
    if (loading || !hasMore) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 10) {
      // Đã tới cuối, load thêm
      const nextPage = page + 1;
      const nextData = allNotifications.slice(0, nextPage * pageSize);
      setNotifications(nextData);
      setPage(nextPage);
      setHasMore(nextData.length < allNotifications.length);
    }
  };

>>>>>>> Stashed changes
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline"
            }
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <Badge badgeContent={notifications.length} color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              width: 350,
              maxHeight: 400,
              p: 0,
              mt: 1.5,
            }
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", fontWeight: 600 }}>Thông báo mới</Box>
<<<<<<< Updated upstream
          {loading ? (
            <MenuItem disabled><Box sx={{ p: 2 }}>Đang tải...</Box></MenuItem>
          ) : notifications.length === 0 ? (
            <MenuItem disabled><Box sx={{ p: 2, color: "#888" }}>Không có thông báo</Box></MenuItem>
          ) : (
            notifications.map((item) => (
              <MenuItem
                key={item._id}
                sx={{
                  alignItems: 'flex-start',
                  whiteSpace: 'normal',
                  borderBottom: '1px solid #eee',
                  cursor: item.isRead ? 'default' : 'pointer',
                  opacity: item.isRead ? 0.6 : 1,
                  backgroundColor: item.isRead ? '#f5f5f5' : 'inherit',
                  '&:hover': { backgroundColor: item.isRead ? '#f5f5f5' : '#f0f7ff' }
                }}
               onClick={() => !item.isRead && handleReadAndGo(item)}
                disabled={item.isRead}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Box>
                    <Typography fontWeight={item.isRead ? 400 : 500}>{item.message}</Typography>
                    <Typography fontSize={12} color="#888">{new Date(item.created_at).toLocaleString()}</Typography>
                  </Box>
                  {item.isRead && (
                    <Box display="flex" alignItems="center" gap={0.5} ml={1}>
                      <span style={{ color: '#4caf50', fontSize: 16 }}>✔</span>
                      <Typography fontSize={12} color="#4caf50">Đã đọc</Typography>
                    </Box>
                  )}
                </Box>
              </MenuItem>
            ))
          )}
=======
          <Box
            ref={menuListRef}
            sx={{ maxHeight: 320, overflowY: 'auto' }}
            onScroll={handleMenuScroll}
          >
            {loading ? (
              <MenuItem disabled><Box sx={{ p: 2 }}>Đang tải...</Box></MenuItem>
            ) : notifications.length === 0 ? (
              <MenuItem disabled><Box sx={{ p: 2, color: "#888" }}>Không có thông báo</Box></MenuItem>
            ) : (
              notifications.map((item) => (
                <MenuItem
                  key={item._id}
                  sx={{
                    alignItems: 'flex-start',
                    whiteSpace: 'normal',
                    borderBottom: '1px solid #eee',
                    cursor: item.isRead ? 'default' : 'pointer',
                    opacity: item.isRead ? 0.6 : 1,
                    backgroundColor: item.isRead ? '#f5f5f5' : 'inherit',
                    '&:hover': { backgroundColor: item.isRead ? '#f5f5f5' : '#f0f7ff' }
                  }}
                  onClick={() => !item.isRead && handleReadAndGo(item)}
                  disabled={item.isRead}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box>
                      <Typography fontWeight={item.isRead ? 400 : 500}>{item.message}</Typography>
                      <Typography fontSize={12} color="#888">{new Date(item.created_at).toLocaleString()}</Typography>
                    </Box>
                    {item.isRead && (
                      <Box display="flex" alignItems="center" gap={0.5} ml={1}>
                        <span style={{ color: '#4caf50', fontSize: 16 }}>✔</span>
                        <Typography fontSize={12} color="#4caf50">Đã đọc</Typography>
                      </Box>
                    )}
                  </Box>
                </MenuItem>
              ))
            )}
            {/* Hiển thị loading khi đang tải thêm */}
            {!loading && hasMore && notifications.length > 0 && (
              <MenuItem disabled><Box sx={{ p: 2, textAlign: 'center', color: '#888' }}>Kéo xuống để tải thêm...</Box></MenuItem>
            )}
            {!loading && !hasMore && notifications.length > 0 && (
              <MenuItem disabled><Box sx={{ p: 2, textAlign: 'center', color: '#888' }}>Đã hiển thị tất cả</Box></MenuItem>
            )}
          </Box>
>>>>>>> Stashed changes
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
            <Button size="small" color="error" onClick={handleClearNotifications}>Giải phóng thông báo</Button>
            <Button size="small" onClick={handleCloseMenu}>Đóng</Button>
          </Box>
        </Menu>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object
};

export default Header;
