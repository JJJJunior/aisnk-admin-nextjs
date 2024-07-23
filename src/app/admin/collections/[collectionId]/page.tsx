"use client";
import EditForm from "@/app/admin/components/collections/EditForm";
import { CollectionType } from "@/lib/types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/app/admin/components/Loader";

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

  // console.log(productDetails);

  const getCollectionDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/collections/${params.collectionId}`);
      if (res.status === 200) {
        setCollectionDetails(res.data);
      }
    } catch (err) {
      console.log("[collectionId_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? <Loader /> : <EditForm collectionData={collectionDetails} />;
};

export default CollectionDetail;
