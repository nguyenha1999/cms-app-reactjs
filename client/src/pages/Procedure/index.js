import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, Badge, Dropdown, Pagination } from 'antd';
import {
    DeleteOutlined, EditOutlined, CloudDownloadOutlined,
    ScheduleOutlined, FolderAddOutlined
} from '@ant-design/icons';
import {
    getListProcedure, deleteProcedure, downloadProcedure,
} from './../../store/actions/Procedure';
import Modal from "./../../components/Modal/index.js";
import Form from "./components/form";
import { startActionWithPromise } from './../../helpers/saga-promise-helpers';
import moment from "moment";
import Loading from "./../../components/Loading";
import Button from './../../components/Button';
import { message, Tooltip } from 'antd';
import FormDocument from "./../Document/components/form";

const HOST = "http://localhost:3000"

const Procedure = () => {

    const dispatch = useDispatch();
    const items = useSelector(state => state.procedure.items);
    const total = useSelector(state => state.procedure.total);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    });
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("");
    const [item, setItem] = useState(null);
    const [visibleDocument, setVisibleDocument] = useState(false);
    const [actionDocument, setActionDocument] = useState(null);

    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            setLoading(true);
            try {
                await startActionWithPromise(getListProcedure, model, dispatch);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        return () => mounted = false;
    }, [model.page])

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const onOk = () => { }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await startActionWithPromise(deleteProcedure, { id }, dispatch);
            setLoading(false);
            message.success('Xóa thành công');
        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error('Xóa không thành công');
        }
    }

    const download = (item) => {
        const token = localStorage.getItem('token');
        let link = document.createElement("a");
        link.href = `${HOST}/download/${item.document.file._id}?access_token=${token}`;
        link.download = item.document.file.name;
        link.click();
        link.remove();
    }

    const downloadMunltiple = async (item) => {
        const token = localStorage.getItem('token');
        for (let index = 0; index < item.length; index++) {
            setTimeout(() => {
                var link = document.createElement("a");
                link.href = `${HOST}/download/${item[index].document.file._id}?access_token=${token}`;
                link.download = item[index].codeInProcedure;
                link.click()
                link.remove();
            }, index * 3000);

        }
    }

    const expandedRowRender = (record, index, indent, expanded) => {
        const dataColumn = record.documents.map(item => ({
            ...item,
            key: item.document._id
        }));
        const columns = [
            {
                title: "Mã Tài Liệu - Quy Trình ",
                dataIndex: "codeInProcedure",
                key: "codeInProcedure"
            },
            {
                title: "Mã Tài Liệu",
                dataIndex: ["document", "code"],
                key: "code"
            },
            {
                title: "Tên Tài Liệu",
                dataIndex: ["document", "name"],
                key: "name"
            },
            {
                title: 'Lần Ban Hành ',
                dataIndex: ["document", "edition"],
                key: 'edition',
                render: (text) => (
                    <>
                        <Badge status="processing" color={"green"} />
                        {text}

                    </>
                ),
            },
            {
                title: 'Ngày Tạo',
                dataIndex: ["document", "publishedDate"],
                key: 'publishedDate',
                render: (date) =>
                (
                    <Button icon={<ScheduleOutlined />}
                        type={"link"}
                        onClick={e => e.preventDefault()}
                        text={moment(date).format('H:m:s MM/DD/YYYY')}
                    />

                ),
            },
            {
                title: 'Chức Năng',
                dataIndex: 'edit',
                key: 'edit',
                render: (text, item) => (
                    <>
                        <Button icon={<EditOutlined />}
                            onClick={() => {
                                setVisibleDocument(true)
                                setActionDocument("editDocument")
                                setItem({ ...item.document, idProcedure: record._id });
                            }}
                            type="link"
                            placement="top" tooltip="Sửa" />
                        <Button icon={<CloudDownloadOutlined />}
                            onClick={() => download(item)}
                            placement="top" tooltip="Tải xuống" type="link" />
                    </>

                ),
            },
        ];

        return <Table
            size="small"
            columns={columns}
            dataSource={dataColumn}
            pagination={false} />;
    };

    const columns = [
        {
            title: 'Mã Quy Trình',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (date) =>
            (
                <Button icon={<ScheduleOutlined />}
                    type={"link"}
                    onClick={e => e.preventDefault()}
                    text={moment(date).format('H:mm:ss MM/DD/YYYY')}
                />
            ),
        },
        {
            title: 'Chức Năng',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />}
                        onClick={() => {
                            setVisible(true)
                            setAction("edit")
                            setItem(record);
                        }}
                        type="link"
                        placement="top" tooltip="Sửa" />
                    <Button icon={<CloudDownloadOutlined />}
                        onClick={() => downloadMunltiple(record.documents)}
                        placement="top" tooltip="Tải xuống" type="link" />
                </>

            ),
        },
        {
            title: 'Xóa',
            dataIndex: '_id',
            key: '_id',
            render: (_id) =>
            (
                <Popconfirm title="Bạn có chắc muốn xóa?"
                    onConfirm={() => handleDelete(_id)}
                    okText="Có" cancelText="Không" >
                    <Button icon={<DeleteOutlined />} placement="top" tooltip="Xóa" type="link" />
                </Popconfirm>
            )
        },
    ];

    const data = items.map(item => ({
        ...item,
        key: item._id
    }));

    return (
        <div className="position: relative">
            <Loading show={loading} />
            <div className="d-flex">
                <Button
                    className="ml-auto"
                    type="primary"
                    style={{ marginBottom: 16, }}
                    icon={<FolderAddOutlined />}
                    onClick={() => {
                        setVisible(true)
                        setAction("add")
                    }}
                    text={"Thêm Quy Trình"}
                >
                </Button>
            </div>

            <Table
                size="middle"
                dataSource={data}
                pagination={false}
                expandedRowRender={expandedRowRender}
                className="components-table-demo-nested"
                columns={columns} />

            <div className="d-flex mt-1">
                <Pagination
                    className="ml-auto"
                    defaultCurrent={model.page}
                    showColorChanger={false}
                    pageColor={5}
                    total={total}
                    onChange={changePage}
                    pageSize={model.pageSize}
                />
            </div>
            {
                visible &&
                (
                    <Modal
                        title={action == "add" ? "Thêm Quy Trình" : "Sửa Quy Trình"}
                        width={567}
                        visible={visible}
                        onCancel={() => {
                            setVisible(false)
                            setAction("")
                            setItem(null)
                        }}
                        onOk={onOk}
                        footer={null}
                    >
                        <div>
                            <Form
                                item={item}
                                action={action}
                                handleClose={() => setVisible(false)} />
                        </div>
                    </Modal>
                )
            }
            {
                visibleDocument &&
                (
                    <Modal
                        title={actionDocument == "add" ? "Thêm Tài Liệu" : "Sửa Tài Liệu"}
                        width={567}
                        visible={visibleDocument}
                        onCancel={() => {
                            setVisibleDocument(false)
                            setActionDocument(null)
                            setItem(null)
                        }}
                        onOk={onOk}
                        footer={null}
                    >
                        <div>
                            <FormDocument
                                item={item}
                                action={actionDocument}
                                handleClose={() => setVisibleDocument(false)} />
                        </div>
                    </Modal>
                )
            }
        </div >
    )
}
export default Procedure;