import React, { useRef, useState, useEffect } from 'react';
import Upload from "./../../../components/Upload";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from "./../../../components/Input";
import Button from "./../../../components/Button";
import { Row, Col, message, Image, Form } from 'antd';
import { createDocument, editDocument } from "./../../../store/actions/Document";
import { editDocumentToProcedure } from "./../../../store/actions/Procedure";
import { startActionWithPromise } from './../../../helpers/saga-promise-helpers';
import Loading from "./../../../components/Loading";
import ViewFile from "./../../../components/ViewFile";

const HOST = "http://localhost:3000/"

const Forms = ({ handleClose, action, item }) => {
    const schema = yup.object().shape({
        name: yup.string().required(" Nhập tên tài liệu của bạn"),
        code: yup.string().required(" Nhập mã tài liệu của bạn"),
    });

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const [visible, setVisible] = useState(false);

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (!item) return;
        setFileList([item.file]);
    }, [item]);

    const handleUploadSuccess = (res) => {
        setFileList([res]);
    }

    const onSubmit = async (data) => {
        if (fileList.length == 0) {
            message.error('Bạn cần tải file');
            return;
        }
        setLoading(true);
        data = {
            ...data,
            file: fileList[0]._id
        }
        try {
            if (action == "add") {
                const res = await startActionWithPromise(createDocument, data, dispatch);
                if (res.error) {
                    message.error(res.message);
                } else {
                    message.success('Thêm mới thành công');
                }
            } else if (action == "editDocument") {
                const res = await startActionWithPromise(editDocumentToProcedure,
                    { ...data, _id: item._id, idProcedure: item.idProcedure }, dispatch);
                if (res.error) {
                    message.error(res.message);
                } else {
                    message.success('Sửa thành công');
                }
            } else {
                const res = await startActionWithPromise(editDocument,
                    { ...data, _id: item._id }, dispatch);
                if (res.error) {
                    message.error(res.message);
                } else {
                    message.success('Sửa thành công');
                }
            }

        } catch (error) {
            if (action == "add") {
                message.error('Thêm mới không thành công');
            } else {
                message.error('Sửa không thành công');
            }
        }
        setLoading(false);
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

    const viewFile = (url) => {
        url = HOST + url;
        url = "https://view.officeapps.live.com/op/view.aspx?src=" + url;
        console.log(url);
        setVisible(true);
    }

    return (
        <div className="position-relative">
            <Loading show={loading} />
            <div className="position-relative">
                <Loading show={loading} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row gutter={16}>
                        <Col md={24}>
                            <Controller
                                rules={{
                                    validate: (name) => (
                                        schema.validate({ name }).catch((e) => e.message))
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        name="name"
                                        label="Tên tài liệu"
                                        placeholder="Tên tài liệu..."
                                        error={error}
                                    />
                                )}
                                name="name"
                                control={control}
                                defaultValue={item ? item.name : ""}
                            />
                        </Col>
                        <Col md={24}>
                            <Controller
                                rules={{
                                    validate: (code) => (
                                        schema.validate({ code }).catch((e) => e.message))
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        name="code"
                                        label="Mã tài liệu"
                                        placeholder="Mã tài liệu..."
                                        error={error}
                                    />
                                )}
                                name="code"
                                control={control}
                                defaultValue={item ? item.code : ""}
                            />
                        </Col>
                    </Row>

                    <Row>
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
                    </Row>
                    <Row className="mt-1">
                        <Upload
                            multiple={false}
                            onUploadSuccess={(res) => handleUploadSuccess(res)}
                            onUploadFaile={(err) => console.log(err, "err")}
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                    </Row>
                    <div className="d-flex">
                        <Button text={action == "add" ? "Thêm" : "Sửa"} className="ml-auto"
                            onClick={() => handleSubmit(onSubmit)()}
                        />
                    </div>
                </form>
                {
                    visible && (
                        <ViewFile
                            visible={visible}
                            setVisible={() => setVisible(false)}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default Forms;