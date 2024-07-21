"use client"
import React from 'react';
import {useAuth} from "@clerk/nextjs";
import NoAuth from "@/components/NoAuth";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import Link from "next/link";
import DataTable from "@/components/DataTable";

const Products = () => {
  const {userId} = useAuth()
  if (!userId) {
    return (
      <NoAuth/>
    )
  }

  return (
    <div>
      <div>
        <Button type="primary">
          <Link href="/products/new">
            添加产品<PlusCircleOutlined/>
          </Link>
        </Button>
      </div>
      <div>
        <DataTable/>
      </div>
    </div>
  );
};

export default Products;