"use client";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { md5WithSalt } from "@/lib/md5";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import type { GetProp, UploadFile, UploadProps } from "antd";

interface UploadImagesProps {
  setImages: (value: ((prevState: string[]) => string[]) | string[]) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ setImages }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    //处理一下加密的内容，提交到接口
    const password = md5WithSalt();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: password,
      },
      onUploadProgress: (event) => {
        // console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };
    fmData.append("image", file);
    axios
      .post(process.env.NEXT_PUBLIC_AVA_IMAGE_SERVER!, fmData, config)
      .then((res) => {
        onSuccess(file);
        // console.log(res);
        //将上传图片服务器返回的url传递给控件
        setImages((prevState) => {
          return [...prevState, res.data.data.image_url];
        });
      })
      .catch((err) => {
        const error = new Error("Some error");
        onError({ event: error });
      });
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        multiple
        maxCount={6}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        customRequest={uploadImage}
      >
        <Button onClick={(evt) => evt.preventDefault()} icon={<UploadOutlined />}>
          点击上传最多6张
        </Button>
      </Upload>
    </ImgCrop>
  );
};

export default UploadImages;
