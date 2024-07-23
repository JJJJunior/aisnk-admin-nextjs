"use client";
import React, { useState, useEffect, cache } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DataTable from "@/components/collections/DataTable";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { CollectionType } from "@/lib/types";
import axios from "axios";
import Loader from "@/components/Loader";

const Collections = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

  if (!userId) {
    router.push("/sign-in");
  }

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
          <Link href="/collections/new">
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
