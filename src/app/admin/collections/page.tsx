"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/app/admin/components/collections/DataTable";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { CollectionType } from "@/lib/types";
import axios from "axios";
import Loader from "@/app/admin/components/Loader";

const Collections = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("/api/collections");
      if (res.status === 200) {
        setCollections(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // console.log(collections);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div>
        <Button type="primary">
          <Link href="/admin/collections/new">
            添加栏目
            <PlusCircleOutlined className="ml-2" />
          </Link>
        </Button>
      </div>
      <div>
        <DataTable dataSource={collections} fetchCollections={fetchCollections} />
      </div>
    </div>
  );
};

export default Collections;
