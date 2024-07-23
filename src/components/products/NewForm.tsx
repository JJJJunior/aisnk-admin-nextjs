"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import UploadImages from "@/components/UploadImages";
import Image from "next/image";
import { CloseSquareOutlined, LoadingOutlined } from "@ant-design/icons";
import { ProductType, CollectionType } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { message } from "antd";
import Link from "next/link";

const NewForm: React.FC = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCollections = async () => {
    try {
      const res = await axios.get("/api/collections");
      res.status === 200 && setCollections(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const checkUniqueTitle = async (title: string) => {
    try {
      const res = await axios.get(`/api/products/check/${title}`);
      if (res.status === 200 && res.data?.title === title) {
        return false;
      }
    } catch (err) {
      console.error(err);
    }
    return true;
  };
  const onFinish = async (values: any) => {
    // console.log(values);
    const newProduct: ProductType = {
      ...values,
      images: images,
      colors: replaceSymbols(values.colors),
      sizes: replaceSymbols(values.sizes),
      tags: replaceSymbolsInTags(values.tags),
    };
    // console.log("Received values of form: ", newProduct);
    if ((await checkUniqueTitle(values.title)) === true) {
      setLoading(true);
      try {
        const res = await axios.post(`/api/products/`, newProduct);
        if (res.status === 200) {
          message.success("创建产品成功");
          router.push("/products");
        }
      } catch (err) {
        console.error(err);
        message.error("创建产品失败");
      } finally {
        cleanAll();
        setLoading(false);
      }
    } else {
      message.error("产品标题名称已存在");
      return;
    }
  };
  const cleanAll = () => {
    form.resetFields();
    setCollections([]);
    setImages([]);
  };
  const handRemoveImageBtn = (evt: React.MouseEvent<HTMLButtonElement>, item: string) => {
    evt.preventDefault();
    setImages((prevState) => prevState.filter((url) => url !== item));
  };

  const replaceSymbols = (input: string): string => {
    // 定义要替换的符号和目标符号
    const symbolsToReplace = /[， ；、‧]/g;
    const replacementSymbol = ",";

    // 检查字符串是否包含要替换的符号
    if (symbolsToReplace.test(input)) {
      // 使用正则表达式替换所有符合条件的符号
      return input.replace(symbolsToReplace, replacementSymbol);
    }

    // 如果没有符号要替换，直接返回原字符串
    return input;
  };

  const replaceSymbolsInTags = (input: string): string => {
    // 定义要替换的符号和目标符号
    const symbolsToReplace = /[，、]/g;
    const replacementSymbol = ",";

    // 检查字符串是否包含要替换的符号
    if (symbolsToReplace.test(input)) {
      // 使用正则表达式替换所有符合条件的符号
      return input.replace(symbolsToReplace, replacementSymbol);
    }

    // 如果没有符号要替换，直接返回原字符串
    return input;
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div>
          <Form.Item label="产品名称" name="title" rules={[{ required: true, message: "产品名称不能为空" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="产品状态" name="status">
            <Select placeholder="选择状态">
              <Select.Option value="draft">草稿</Select.Option>
              <Select.Option value="published">发布</Select.Option>
              <Select.Option value="archived">归档</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item label="价格 ($)">
            <Form.Item name="price" noStyle rules={[{ required: true, message: "价格不能为空" }]}>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="费用 ($)">
            <Form.Item name="expense" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="库存">
            <Form.Item name="stock" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item
          name="images"
          label="产品图片"
          valuePropName="点击上传图片"
          rules={[
            {
              validator: () => {
                if (!images || images.length === 0) {
                  return Promise.reject(new Error("请至少上传一张图片"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <UploadImages setImages={setImages} />
        </Form.Item>
        <div className="flex flex-wrap gap-4">
          {images.length > 0 &&
            images.map((item, index) => (
              <div key={index} className="flex relative">
                <div>
                  <Image src={item} alt={"pic"} width={200} height={300} className="rounded-xl border shadow-lg" />
                </div>
                <button
                  onClick={(evt) => handRemoveImageBtn(evt, item)}
                  className="absolute right-2 top-2 text-2xl text-gray-400 hover:text-red-600"
                >
                  <CloseSquareOutlined />
                </button>
              </div>
            ))}
        </div>
        <Form.Item label="产品描述" name="description" rules={[{ required: true, message: "产品描述不能为空" }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <div className="grid grid-cols-3 justify-center gap-4">
          <Form.Item label="上线栏目" name="collections">
            <Select placeholder="选择栏目" mode="multiple">
              {collections.length > 0 &&
                collections.map((collection) => (
                  <Select.Option value={collection.id} key={collection.id}>
                    {collection.title}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="分类名称" name="category" rules={[{ required: true, message: "分类名称不能为空" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="颜色" name="colors">
            <Input placeholder="比如：red、yellow、blue 仅支持逗号、顿号、空格进行分隔" />
          </Form.Item>
          <Form.Item label="尺寸" name="sizes">
            <Input placeholder="比如：36 37 41 42 仅支持逗号、顿号、空格进行分隔" />
          </Form.Item>
          <Form.Item label="标签" name="tags">
            <Input placeholder="比如：shoes，hot，summer 只支持逗号、顿号进行分隔" />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin indicator={<LoadingOutlined spin />} /> : "保存"}
            </Button>
            <Button type="primary">
              <Link href="/products">取消</Link>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewForm;
