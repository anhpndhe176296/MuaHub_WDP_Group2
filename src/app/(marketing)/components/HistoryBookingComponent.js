"use client";

import { convertDate, convertDateTime, formatCurrency } from "@muahub/utils/Main";
import SendRequest from "@muahub/utils/SendRequest";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const HistoryBookingComponent = ({ currentUser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceFeedback, setServiceFeedback] = useState(null);
  const [feedback, setFeedback] = useState({ title: "", reason: "", rating: 0 });
  const [userFeedback, setUserFeedback] = useState([]);
  const [modalHuySan, setModalHuySan] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const onHuySan = (booking) => {
    setSelectedBooking(booking);
    setModalHuySan(true);
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await SendRequest("GET", "/api/orders", { userId: currentUser._id });
    if (res.payload) {
      setBookings(res.payload);
    }
    setLoading(false);
  }, [currentUser._id]);

  const handleCancelBooking = async () => {
    if (!currentUser.bank_info_number || !currentUser.bank_info) {
      toast.error("Bạn cần cập nhật thông tin ngân hàng để hủy dịch vụ!");
      return;
    }
    await SendRequest("PUT", "/api/orders", {
      id: selectedBooking._id,
      status: "cancelled"
    });
    await SendRequest("POST", "/api/refund", {
      totalAmount: selectedBooking.deposit,
      discount: 10,
      type: "cancel_booking",
      userId: currentUser._id,
      bank_info_number: currentUser.bank_info_number,
      bank_info: currentUser.bank_info,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role
    });
    fetchBookings();
    setModalHuySan(false);
    toast.success("Đã hủy dịch vụ thành công!. Tiền cọc sẽ được hoàn trả trong vòng 3-5 ngày làm việc.");
  };

  useEffect(() => {
    fetchBookings();
  }, [currentUser._id, fetchBookings, showModal]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await SendRequest("GET", "/api/feedbacks");
      if (res.payload) {
        setUserFeedback(res.payload);
      }
    };
    fetchFeedbacks();
  }, [currentUser._id]);

  const ratedOrderIds = userFeedback
    .filter((feedback) => feedback.userId === currentUser._id)
    .map((feedback) => feedback.orderId);

  const bookingsFiltered = bookings.filter((booking) => !ratedOrderIds.includes(booking._id));

  const handleFeedbackSubmit = async () => {
    if (!feedback.title || !feedback.reason || feedback.rating === 0) {
      alert("Vui lòng điền đầy đủ thông tin và chọn số sao đánh giá!");
      return;
    }

    const payload = {
      userId: currentUser._id,
      orderId: serviceFeedback._id,
      serviceId: serviceFeedback.serviceId,
      title: feedback.title,
      reason: feedback.reason,
      rating: feedback.rating
    };

    const res = await SendRequest("POST", "/api/feedbacks", payload);
    if (res) {
      toast.success("Phản ánh và đánh giá của bạn đã được gửi thành công!");
      setShowModal(false);
      setFeedback({ title: "", reason: "", rating: 0 });
      setServiceFeedback(null);
      fetchBookings();
    }
  };

  const onFeedBack = (booking) => {
    setServiceFeedback(booking);
    setShowModal(true);
  };

  const renderStars = () => (
    <div className="d-flex align-items-center gap-2">
      <span>Đánh giá:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star ${feedback.rating >= star ? "text-warning" : "text-muted"}`}
          style={{ cursor: "pointer", fontSize: "1.2rem", transition: "color 0.2s ease" }}
          onClick={() => setFeedback({ ...feedback, rating: star })}
        />
      ))}
      <span className="text-muted ms-2">{feedback.rating > 0 ? `${feedback.rating}/5 sao` : "Chọn số sao"}</span>
    </div>
  );

  const checkTime = (booking) => {
    const isAlreadyRated = ratedOrderIds.includes(booking._id);
    const [startTime] = booking.time.split(" - ");
    const [year, month, day] = booking.date.split("-").map(Number);
    const [hour, minute] = startTime.split(":").map(Number);
    const bookingDateTime = new Date(year, month - 1, day, hour, minute);
    const cancelDeadline = new Date(bookingDateTime.getTime() - 3 * 60 * 60 * 1000);
    const now = new Date();
    const canCancel = now < cancelDeadline;
    const canRate = now > bookingDateTime;
    return { isAlreadyRated, canCancel, canRate };
  };

  return (
    <div className="w-100 overflow-auto">
      <div className="d-none d-md-block">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Dịch vụ</th>
              <th className="text-center">Ngày đặt</th>
              <th className="text-center">Loại dịch vụ</th>
              <th className="text-center">Mã dịch vụ</th>
              <th className="text-center">Khung giờ</th>
              <th className="text-center">Tiền cọc</th>
              <th className="text-center">Còn lại</th>
              <th className="text-center">Đánh giá</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const { isAlreadyRated, canCancel, canRate } = checkTime(booking);
                return (
                  <tr key={booking._id}>
                    <td>
                      <Link href={`/make-up/${booking.serviceId}`}>{booking.service?.serviceName}</Link>
                    </td>
                    <td>{convertDate(booking.date)}</td>
                    <td>Dịch vụ {booking.field} người</td>
                    <td>Dịch vụ số {booking.fieldSlot + 1}</td>
                    <td>{booking.time}</td>
                    <td>{formatCurrency(booking.deposit)}</td>
                    <td>{formatCurrency(booking.remaining)}</td>
                    <td className="text-center">
                      <button
                        className={`btn btn-sm ${isAlreadyRated ? "btn-secondary" : "btn-primary"}`}
                        onClick={() => onFeedBack(booking)}
                        disabled={isAlreadyRated || !canRate}
                      >
                        <i className="fas fa-comment me-1"></i>
                        <i className="fas fa-star"></i>
                        {isAlreadyRated && <span className="ms-1">✓</span>}
                      </button>
                      <button
                        disabled={!canCancel}
                        className="btn btn-sm btn-danger ms-2"
                        title="Hủy dịch vụ"
                        onClick={() => onHuySan(booking)}
                      >
                        Hủy dịch vụ
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal hủy */}
      <Modal show={modalHuySan} onHide={() => setModalHuySan(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle text-danger me-2"></i> Xác nhận hủy dịch vụ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-warning" role="alert">
            <p>Bạn có chắc chắn muốn hủy dịch vụ này không?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalHuySan(false)}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleCancelBooking}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistoryBookingComponent;
