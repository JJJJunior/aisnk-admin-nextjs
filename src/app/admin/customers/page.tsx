import React from "react";
import { Table } from "antd";
import { getCustomers } from "@/lib/actions";

const CustomerPage = async () => {
  const customers = await getCustomers();
  const columns = [
    {
      title: "姓名",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  console.log(customers);
  return (
    <div>
      <Table dataSource={customers} columns={columns} rowKey={"id"} />;
    </div>
  );
};

export default CustomerPage;
