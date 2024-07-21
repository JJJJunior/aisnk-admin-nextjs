import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { md5WithSalt } from "@/lib/md5";
import axios from "axios";

interface UploadImagesProps {
  setImages: (value: ((prevState: any[]) => any[]) | any[]) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ setImages }) => {
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
    <Upload multiple maxCount={6} customRequest={uploadImage}>
      <Button icon={<UploadOutlined />}>点击上传最多6张</Button>
    </Upload>
  );
};

export default UploadImages;
