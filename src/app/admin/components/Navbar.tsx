"use client"
import React, {useEffect, useState} from 'react';
import {
  ShoppingOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {HomeOutlined} from "@ant-design/icons";
import {usePathname, useRouter} from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined/>,
  },
  {
    label: '栏目管理',
    key: 'collections',
    icon: <AppstoreOutlined/>,
  },
  {
    label: '产品管理',
    key: 'products',
    icon: <ShoppingOutlined/>,
  },
  {
    label: '订单管理',
    key: 'orders',
    icon: <ShoppingCartOutlined/>,
  }, {
    label: '客户管理',
    key: 'customers',
    icon: <UsergroupAddOutlined/>,
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [current, setCurrent] = useState("");
  const router = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    router.push(`/admin/${e.key}`)
  };

  useEffect(() => {
    setCurrent(pathname.split("/")[1])
  }, [pathname]);
  return <Menu style={{border: "none"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default Navbar;