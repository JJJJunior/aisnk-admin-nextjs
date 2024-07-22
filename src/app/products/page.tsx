"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import DataTable from "@/components/products/DataTable";
import { useRouter } from "next/navigation";
import { ProductType } from "@/lib/types";
import axios from "axios";

const Products = () => {
  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) {
    router.push("/sign-in");
  }
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      res.status === 200 && setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
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
        <DataTable dataSource={products} />
      </div>
    </div>
  );
};

export default Products;
