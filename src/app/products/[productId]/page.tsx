"use client";
import EditForm from "@/components/products/EditForm";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

import { ProductType } from "@/lib/types";

const EditorPage = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  console.log(productDetails);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/products/${params.productId}`);
      if (res.status === 200) {
        setProductDetails(res.data);
      }
    } catch (err) {
      console.log("[productId_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? <Loader /> : <EditForm initialData={productDetails} />;
};

export default EditorPage;
