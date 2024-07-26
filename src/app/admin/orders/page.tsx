"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/app/admin/components/orders/DataTable";
import { OrderType } from "@/lib/types";
import axios from "axios";
import Loader from "@/app/admin/components/Loader";

const Collections = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      if (res.status === 200) {
        setOrders(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // console.log(collections);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <DataTable dataSource={orders} fetchOrders={fetchOrders} />
    </div>
  );
};

export default Collections;
