"use client";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import DataTable from "@/app/admin/components/products/DataTable";
import axios from "axios";
import Loader from "@/app/admin/components/Loader";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      if (res.status === 200) {
        setProducts(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div>
        <Button type="primary">
          <Link href="/admin/products/new">
            添加产品
            <PlusCircleOutlined className="ml-2" />
          </Link>
        </Button>
      </div>
      <div>
        <DataTable dataSource={products} fetchProducts={fetchProducts} />
      </div>
    </div>
  );
};

export default Products;
