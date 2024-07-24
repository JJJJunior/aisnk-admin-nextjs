"use client";
import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import UploadImages from "@/app/admin/components/UploadImages";
import Image from "next/image";
import { CloseSquareOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { CollectionType } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewForm: React.FC = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onFinish = async (values: any) => {
    const newCollection: CollectionType = {
      ...values,
      images,
    };
    // console.log("Received values of form: ", newCollection);
    setLoading(true);
    try {
      const res = await axios.post("/api/collections", newCollection);
      if (res.status === 200) {
        message.success("创建栏目成功");
        router.push("/admin/collections");
      }
    } catch (err) {
      console.log(err);
      message.error("创建栏目失败");
    } finally {
      cleanAll();
      setLoading(false);
    }
  };

  const cleanAll = () => {
    form.resetFields();
    setImages([]);
  };
  const handRemoveImageBtn = (evt: React.MouseEvent<HTMLButtonElement>, item: string) => {
    evt.preventDefault();
    setImages((prevState) => prevState.filter((url) => url !== item));
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="栏目名称" name="title" rules={[{ required: true, message: "栏目名称不能为空" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="images"
          label="栏目图片"
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
        <div className="mt-6">
          <Form.Item label="栏目描述" name="description" rules={[{ required: true, message: "栏目描述不能为空" }]}>
            <Input.TextArea rows={6} />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="flex gap-4">
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin indicator={<LoadingOutlined spin />} /> : "提交"}
            </Button>
            <Button type="primary" onClick={(evt) => evt.preventDefault()}>
              <Link href="/admin/collections">返回</Link>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewForm;
