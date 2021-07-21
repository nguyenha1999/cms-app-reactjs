/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Upload, message, Modal, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import axios from "axios";

const ENTRY = "http://localhost:3000/upload"

const  Index = ({ maxCount, preview, name, multiple, action, onUploadSuccess, onUploadFaile, accept }) => {
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList)
    };

    const beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('File phải có kích thước nhỏ hơn 2MB!');
        }
        return isLt2M;
    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        let formData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
            formData.append("", fileList[i].originFileObj);
        }

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }

        axios.post(ENTRY, formData, {
            headers: headers
        })
            .then(res => {
                setLoading(false);
                onUploadSuccess(res.data);
                setFileList([]);
            })
            .catch(err => {
                setLoading(false);
                onUploadFaile(err);
                setFileList([]);
            });
    };

    const uploadButton = (
        <div >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Chọn file</div>
        </div>
    );
    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                defaultFileList={[...fileList]}
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
                accept={accept}
                onChange={handleChange}
                multiple={multiple}
                showUploadList={true}
            >
                {fileList.length >= maxCount ? null : uploadButton}

            </Upload>
            {
                preview && (
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={() => setPreviewVisible(false)}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                )
            }
            {
                fileList.length > 0 && (
                    <Button onClick={handleSubmit}>
                        {loading && <LoadingOutlined />}
                        Tải lên
                    </Button>
                )
            }
        </>
    )
}
Index.propTypes = {
    fileList: PropTypes.array,
    maxUpload: PropTypes.number,
    name: PropTypes.string,
    preview: PropTypes.bool,
    multiple: PropTypes.bool,
    action: PropTypes.string,
    maxCount: PropTypes.number,
    onUploadSuccess: PropTypes.func,
    onUploadFaile: PropTypes.func,
    accept: PropTypes.string,
}

Index.defaultProps = {
    maxUpload: 10,
    preview: true,
    name: "",
    maxCount: 8,
    multiple: true,
    action: ENTRY,
    accept: "*"
}
export default Index;