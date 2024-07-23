"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import DataTable from "@/components/products/DataTable";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";

const Products = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  if (!userId) {
    router.push("/sign-in");
  }
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
          <Link href="/products/new">
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
