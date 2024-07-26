import React, { useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Button, Input, InputRef, Popconfirm, Space, Table, TableColumnsType, TableColumnType, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { OrderType } from "@/lib/types";
import Link from "next/link";

type DataIndex = keyof OrderType;

interface DataTableProps {
  dataSource: OrderType[];
  fetchOrders: () => Promise<void>;
}

const DataTable: React.FC<DataTableProps> = ({ dataSource, fetchOrders }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  console.log("dataSource............", dataSource);
  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<OrderType> => ({
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
  const columns: TableColumnsType<OrderType> = [
    {
      title: "客户名称",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => customer.name,
    },
    {
      title: "客户邮箱",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => customer.email,
    },
    {
      title: "订单产品数量",
      dataIndex: "products",
      key: "products",
      sorter: (a) => a.products.length,
      sortDirections: ["descend", "ascend"],
      render: (products) => products.length,
    },
    {
      title: "发货地址",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => (
        <div className="flex flex-col text-xs">
          <p>
            <span className="font-semibold">Country:</span> {shippingAddress.country}
          </p>
          <p>
            <span className="font-semibold">City: </span>
            {shippingAddress.city}
          </p>
          <p>
            <span className="font-semibold">State:</span> {shippingAddress.state}
          </p>
          <p>
            <span className="font-semibold">PostalCode:</span> {shippingAddress.postalCode}
          </p>
          <p>
            <span className="font-semibold">StreetName: </span>
            {shippingAddress.streetName}
          </p>
          <p>
            <span className="font-semibold">StreetNumber: </span>
            {shippingAddress.streetNumber}
          </p>
        </div>
      ),
    },
    {
      title: "订单金额",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a) => a.totalAmount,
      sortDirections: ["descend", "ascend"],
      render: (totalAmount) => `$${totalAmount.toFixed(2)}`,
    },
    {
      title: "订单状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "订单时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        const date = new Date(updatedAt);
        const formattedDate = date
          .toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace("T", " ");
        return formattedDate;
      },
    },
  ];
  return (
    <>
      <div className="text-xs">
        <p>待支付（Pending Payment）: 订单已创建，但尚未完成支付。</p>
        <p>已支付（Paid）: 订单已成功支付。</p>
        <p>处理中（Processing）: 订单正在处理，可能在打包或准备发货。</p>
        <p>已发货（Shipped）: 订单已发货，正在运输中。</p>
        <p>已送达（Delivered）: 订单已送达给客户。</p>
        <p>已取消（Cancelled）: 订单已被客户或系统取消。</p>
        <p>退货处理中（Return Processing）: 客户已申请退货，订单正在处理退货中。</p>
        <p>已退货（Returned）: 退货已处理完毕，商品已退回。</p>
        <p>已退款（Refunded）: 客户已收到退款。</p>
        <p>失败（Failed）: 支付或订单处理失败，需要重新处理或已取消。</p>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) =>
            record.products.map((item) => (
              <div key={item.productId} className="flex flex-row items-center space-x-2">
                <Link href={`/admin/products/${item.productId}`}>
                  <p className="font-semibold text-xs text-green-400">产品ID:</p>
                </Link>
                <p className="font-semibold text-xs">{item.productId}</p>
                <p className="font-semibold text-xs">尺寸: {item.size}</p>
                <p className="font-semibold text-xs">颜色: {item.color}</p>
                <p className="font-semibold text-xs">数量: {item.quantity}</p>
                <p className="font-semibold text-xs">单价: {(item.amountSubtotal / 100).toFixed(2)}</p>
                <p className="font-semibold text-xs">货币: {item.currency}</p>
              </div>
            )),
        }}
      />
    </>
  );
};

export default DataTable;
