/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Upload from '../../../component/Upload';
import { createDocument, editDocument } from '../../../redux/action/doc';


const HOST = "http://localhost:3000"

const Forms = ({ item, handleClose, action }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        if (!item) return;
        setFileList([item.file]);
    }, [item]);
    const handleUploadSuccess = (res) => {
        setFileList([res]);
    }
    const [forms, setForms] = useState({
        id: "",
        docname: "",
        code: "",
        file: "",
    })
    const onSubmit = async (data) => {
        if (fileList.length == 0) {
            message.error('Bạn cần tải file');
            return;
        }
        data = {
            ...data,
            file: fileList[0]._id
        }
        try {
            if (action == "add") {
                dispatch(createDocument(forms))
                message.success('Thêm mới thành công');
            } else if (action == "edit") {
                dispatch(editDocument(form.id, form, () => { dispatch(getListDocument(model)) }))
                message.success('Sửa thành công');
            }
        } catch (error) {
            if (action == "add") {
                message.error('Thêm mới không thành công');
            } else {
                message.error('Sửa không thành công');
            }
        }

        setFileList([]);
        handleClose();
    };
    const fullUrl = (url, viewOnline, ext) => {
        if (viewOnline && this.props.previewOnline && !request.isLocal) {
            if (/doc|docx|xls|xlsx|ppt|pptx/.test(ext)) {
                url = request.decode(url);
                url = "https://view.officeapps.live.com/op/view.aspx?src=" + url;
            }
        }
        return HOST + url;
    }


    return (

        <Form
            form={form}
            layout="vertical"
            footer={null}
        >
            <Form.Item
                name="docname"
                label="Tên Tài Liệu"
                rules={[
                    {

                        required: true,
                        message: 'Please input a name !',
                    },
                ]}
            >
                <Input
                    defaultValue={form.docname}
                    value={form.docname}
                    name="docname"
                    onChange={(e) => setForms({ ...forms, [e.target.name]: e.target.value })} />
            </Form.Item>
            <Form.Item
                name="code"
                label="Mã Tài Liệu"
                rules={[
                    {
                        required: true,
                        message: 'Please input a code',
                    },
                ]}>


                <Input
                    defaultValue={form.code}
                    value={form.code}
                    name="code"
                    onChange={(e) => setForms({ ...forms, [e.target.name]: e.target.value })} />
            </Form.Item>
            <Form.Item>
                {
                    fileList.map((item, index) => {
                        return (
                            <div key={index} className="mt-2">
                                {
                                    item.type.indexOf('image') == 0 ?
                                        <Image.PreviewGroup>
                                            <Image
                                                width={150}
                                                style={{ borderRadius: "5px" }}
                                                src={fullUrl(item.url)}
                                            />
                                        </Image.PreviewGroup>
                                        :
                                        <div onClick={() => viewFile(item.url)} className="pointer">

                                            <span>{item.name}</span>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </Form.Item>
            <Form.Item
                name="upload"
                label="Tải Lên" >
                <>
                    <Upload
                        multiple={false}
                        onUploadSuccess={(res) => handleUploadSuccess(res)}
                        onUploadFaile={(err) => console.log(err, "err")}
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                </>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 80,
                    span: 16,
                }}
            >
                <Button type="primary"
                    text="Submit"
                    onClick={() => onSubmit()}
                    htmlType="submit">
                    Thêm
                </Button>
            </Form.Item>

        </Form>
    )
};
export default Forms