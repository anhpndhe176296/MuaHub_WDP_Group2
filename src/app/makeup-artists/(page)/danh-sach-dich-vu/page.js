"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  CircularProgress,
  Pagination,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import { Add } from "@mui/icons-material";
import SendRequest from "@muahub/utils/SendRequest";
import PageContainer from "../../components/container/PageContainer";
import Link from "next/link";
import { useApp } from "@muahub/app/contexts/AppContext";
import { ROLE_MANAGER } from "@muahub/constants/System";
import AddServiceModal from "./components/modalThemDichVu";
import EditServiceModal from "./components/modalSuaDichVu";
<<<<<<< Updated upstream

=======
import toast from "react-hot-toast";
>>>>>>> Stashed changes
const ServiceListPage = () => {
  const { currentUser } = useApp();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const itemsPerPage = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
<<<<<<< Updated upstream
      const res = await SendRequest("GET", "/api/services", {
        ownerId: currentUser.role === ROLE_MANAGER.SALE ? currentUser._id : ""
=======
<<<<<<< Updated upstream
      const res = await SendRequest("GET", "/api/services", {
        ownerId: currentUser.role === ROLE_MANAGER.SALE ? currentUser._id : ""
=======
      const res = await SendRequest("GET", "/api/services/MUA", {
        ownerId: currentUser.role === ROLE_MANAGER.MUA ? currentUser.id : ""
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      });
      if (res.payload) {
        setServices(res.payload);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) return;
    fetchData();
  }, [currentUser, fetchData]);

  const handleReload = () => {
    fetchData();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddSuccess = () => {
    fetchData(); // Refresh danh sách sau khi thêm thành công
  };

  const handleOpenEditModal = (service) => {
    setSelectedService(service);
    setEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setSelectedService({});
  };

  const handleEditSuccess = () => {
    fetchData(); // Refresh danh sách sau khi sửa thành công
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageContainer title="Danh sách dịch vụ" description="Danh sách các dịch vụ hiện có">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Danh sách dịch vụ</Typography>
        <Box display="flex" gap={2}>
          <Link href="/makeup-artists/them-dich-vu">
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: "#ff5c95ff", ":hover": { bgcolor: "#d81b60" } }}
            >
              Thêm dịch vụ mới
            </Button>
          </Link>
          <Button variant="outlined" color="primary" onClick={handleReload}>
            Tải lại
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentItems.length === 0 && (
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={5}>
                <Typography variant="h6" color="textSecondary" mb={2}>
                  Chưa có dịch vụ nào
                </Typography>
                <Link href="/makeup-artists/them-dich-vu">
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ bgcolor: "#ff5c95ff", ":hover": { bgcolor: "#d81b60" } }}
                  >
                    Thêm dịch vụ đầu tiên
                  </Button>
                </Link>
              </Box>
            </Grid>
          )}
          {currentItems.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.images[0] || "/default-service.jpg"}
                  alt={service.serviceName}
                />
                <CardContent>
                  <Typography variant="h6" marginBottom={1}>
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.locationDetail}, {service.location}
                  </Typography>

                  {/* Hiển thị tọa độ nếu có */}
                  {service.latitude && service.longitude && (
                    <Typography variant="body2" color="textSecondary" marginTop={1}>
                      📍 {service.latitude.toFixed(4)}, {service.longitude.toFixed(4)}
                    </Typography>
                  )}

                  <Typography variant="body2" color="textSecondary" marginTop={1}>
                    Giờ mở cửa: {service.openingTime} - {service.closingTime}
                  </Typography>

                  {/* Hiển thị kinh nghiệm nếu có */}
                  {(service.experienceYears || service.experienceMonths) && (
                    <Typography variant="body2" color="textSecondary" marginTop={1}>
                      Kinh nghiệm: {service.experienceYears || 0} năm {service.experienceMonths || 0} tháng
                    </Typography>
                  )}

                  {/* Hiển thị tiện ích nếu có */}
                  {service.amenities && service.amenities.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="body2" mb={1}>
                        <strong>Tiện ích:</strong>
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {service.amenities.slice(0, 3).map((amenity, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            sx={{
                              bgcolor: "primary.light",
                              color: "dark",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: "0.75rem"
                            }}
                          >
                            {amenity}
                          </Typography>
                        ))}
                        {service.amenities.length > 3 && (
                          <Typography variant="caption" color="textSecondary">
                            +{service.amenities.length - 3} khác
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  <Typography variant="body2" mt={1}>
                    <strong>Loại dịch vụ makeup khả dụng:</strong>
                  </Typography>
                  <ul style={{ marginBottom: 0 }}>
                    {Object.values(service.packages)
                      .filter((field) => field.isAvailable)
                      .map((field, index) => (
                        <li key={index}>
                          <Typography variant="body2" color="textSecondary" marginTop={1}>
                            {field.name} - {field.price} VND
                          </Typography>
                        </li>
                      ))}
                  </ul>

                  {/* Xem, sửa, đặt dịch vụ makeup */}
                  <Box display="flex" gap={1} mt={2}>
                    <Link href={`/make-up/${service._id}`}>
                      <Button variant="contained" color="primary" size="small">
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleOpenEditModal(service)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outlined"
<<<<<<< Updated upstream
                      color="error"
                      size="small"
                      onClick={async () => {
                        if (!window.confirm("Bạn chắc chắn muốn xóa dịch vụ này?")) return;
                        try {
                          const res = await SendRequest("DELETE", "/api/services", { id: service._id });
                          if (res?.success) {
                            toast.success("Xóa dịch vụ thành công");
                            fetchData();
                          } else {
                            toast.error(res?.error || "Xóa thất bại");
                          }
                        } catch (e) {
                          toast.error("Có lỗi xảy ra khi xóa");
                        }
                      }}
                    >
                      Xóa
=======
                      color={service.active ? "error" : "success"}
                      size="small"
                      onClick={async () => {
                        const confirmMsg = service.active
                          ? "Bạn chắc chắn muốn ẩn dịch vụ này?"
                          : "Bạn muốn hiện lại dịch vụ này?";
                        if (!window.confirm(confirmMsg)) return;
                        try {
                          const res = await SendRequest("PUT", "/api/services", {
                            id: service._id,
                            active: !service.active,
                            serviceName: service.serviceName,
                            description: service.description,
                            location: service.location,
                            locationDetail: service.locationDetail,
                            latitude: service.latitude,
                            longitude: service.longitude,
                            amenities: service.amenities,
                            openingTime: service.openingTime,
                            closingTime: service.closingTime,
                            images: service.images,
                            packages: service.packages
                          });
                            toast.success(service.active ? "Đã ẩn dịch vụ" : "Đã hiện dịch vụ");
                            fetchData();              
                        } catch (e) {
                          toast.error("Có lỗi xảy ra khi cập nhật", e);
                        }
                      }}
                    >
                      {service.active ? "Ẩn" : "Hiện"}
>>>>>>> Stashed changes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} color="primary" />
        </Box>
      )}

      {/* Modal thêm dịch vụ makeup (giữ lại để không ảnh hưởng luồng cũ; không dùng khi đã điều hướng) */}
      <AddServiceModal open={openModal} onClose={handleCloseModal} onSuccess={handleAddSuccess} />

      {/* Modal sửa dịch vụ makeup */}
      <EditServiceModal
        open={editModal}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        serviceData={selectedService}
      />
    </PageContainer>
  );
};

export default ServiceListPage;
