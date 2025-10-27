"use client";

import { useEffect, useState } from "react";
import BoxFieldComponent from "../components/BoxFieldComponent";
import SendRequest from "@muahub/utils/SendRequest";

const itemsPerPage = 12;

const MakeupServiceNoiBatComponent = () => {
  const [packages, setPackages] = useState([]);

  // Fetch featured packages data from API
  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      const response = await SendRequest("GET", "/api/services/featured");
      if (response.payload) {
        setPackages(response.payload);
        console.log("Featured packages:", response.payload);
      }
    };
    
    // Chỉ fetch nếu không có dữ liệu được truyền vào
  
      fetchFeaturedPackages();
    
  }, []);

  return (
    <div className="container-fluid contact">
      <div className="container pt-5 pb-2">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
          <h1 className="display-5 mb-4">Gói dịch vụ nổi bật</h1>
          <p className="mb-0">Tổng hợp các dịch vụ được nhiều khách đặt nhất, chất lượng cao và uy tín.</p>
        </div>
        {/* Packages List */}
        <div className="row g-3">
          {packages && packages.length > 0 ? (
            packages.slice(0, 6).map((field) => (
              <BoxFieldComponent 
                key={field._id} 
                field={field}
                showDistance={false}
                showBookingCount={true}
              />
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Không có dịch vụ nổi bật nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeupServiceNoiBatComponent;
