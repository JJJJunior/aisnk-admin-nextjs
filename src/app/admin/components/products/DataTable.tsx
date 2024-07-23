import React, { useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Button, Input, InputRef, Popconfirm, Space, Table, TableColumnsType, TableColumnType, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ProductType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type DataIndex = keyof ProductType;

interface DataTableProps {
  dataSource: ProductType[];
  fetchProducts: () => Promise<void>; //用于table页面的刷新
}

const DataTable: React.FC<DataTableProps> = ({ dataSource, fetchProducts }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleDelete = async (key: React.Key) => {
    // console.log(key);
    try {
      const res = await axios.delete(`/api/products/${key}`);
      if (res.status === 200) {
        message.success("删除成功");
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchProducts();
    }
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<CollectionType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`查找 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: TableColumnsType<ProductType> = [
    {
      title: "产品名称",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      render: (_, record) => <Link href={`/admin/products/${record.id}`}>{record.title}</Link>,
    },
    {
      title: "产品图片",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div>
          <Image width={50} height={50} alt="image" src={images?.split(",")[0]} className="rounded-lg" />
        </div>
      ),
    },
    {
      title: "产品分类",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "价格 ($)",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },
    {
      title: "费用 ($)",
      dataIndex: "expense",
      key: "expense",
      ...getColumnSearchProps("expense"),
      render: (expense) => (expense ? expense : "N/A"),
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
      ...getColumnSearchProps("stock"),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (status) => {
        switch (status) {
          case "published":
            return <span className="text-green-500">上线</span>;
          case "draft":
            return <span className="text-red-500">草稿</span>;
          case "archived":
            return <span className="text-blue-500">归档</span>;
          default:
            return <span>{status}</span>;
        }
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div className="flex items-center gap-2">
            <Button>
              <Link href={`/admin/products/${record.id}`}>编辑</Link>
            </Button>
            <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.id)}>
              <Button>删除</Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];
  return <Table columns={columns} dataSource={dataSource} rowKey={"id"} />;
};

export default DataTable;
