"use client";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import TagForm from "@/components/TagForm";
import UploadImages from "@/components/UploadImages";
import Image from "next/image";
import { CloseSquareOutlined, DeleteFilled } from "@ant-design/icons";
import { ProductType } from "@/lib/types";

const ProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const cleanAll = () => {
    form.resetFields();
  };
  const handRemoveImageBtn = (evt: React.MouseEvent<HTMLButtonElement>, item: string) => {
    evt.preventDefault();
    setImages((prevState) => prevState.filter((url) => url !== item));
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div>
          <Form.Item label="产品名称" name="title" rules={[{ required: true, message: "产品名称不能为空" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="产品状态">
            <Select>
              <Select.Option value="demo">草稿</Select.Option>
              <Select.Option value="demo">发布</Select.Option>
              <Select.Option value="demo">归档</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item label="价格">
            <Form.Item name="price" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="库存">
            <Form.Item name="store" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item name="images" label="产品图片" valuePropName="点击上传图片">
          <UploadImages setImages={setImages} />
        </Form.Item>
        <div className="grid grid-cols-6 gap-2">
          {images.length > 0 &&
            images.map((item, index) => (
              <div key={index} className="flex relative">
                <div className="h-42 w-36">
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
        <div className="grid grid-cols-4 justify-center gap-4">
          <Form.Item label="上线栏目">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="颜色">
            <TagForm />
          </Form.Item>
          <Form.Item label="尺寸">
            <TagForm />
          </Form.Item>
          <Form.Item label="标签">
            <TagForm />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="primary">取消</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
