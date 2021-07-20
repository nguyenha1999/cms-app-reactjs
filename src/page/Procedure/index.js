import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, Badge, Dropdown, Pagination, Form } from 'antd';
import {
    DeleteOutlined, EditOutlined, CloudDownloadOutlined,
    ScheduleOutlined, FolderAddOutlined
} from '@ant-design/icons';
import {
    getListProcedure, deleteProcedure, downloadProcedure,
} from '../../redux/action/group';
import Modal from "../../component/Modal/modal";
import moment from "moment";
import Button from '../../component/Button/button';
import { message, Tooltip } from 'antd';
import FormDocument from "./form";


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

    useEffect(() => {
        dispatch(getListProcedure(model))
    }, [model])
    const handleDelete = (id) => {
        dispatch(deleteProcedure(id, { _id: true }, () => { dispatch(getListProcedure(model)) }))
        console.log(id, "id")
    }
    // }
    // const submit = () => {
    //     if (action == "add") {
    //         dispatch(createDocument(form))
    //           } else { 
    //       dispatch(editDocument(form.id , form , ()=> { dispatch(getListDocument(model))})) 
    //     }
    //     setShowModal(false);
    //     setAction("add");
    //     setForm({
    //         ...form,
    //         id: "",
    //         docname: "",
    //         code: "",
    //     })
    // }
    const onOk = () => { }
    const expandedRowRender = (record, index, indent, expanded) => {

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
                dataIndex: ["document", "date"],
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
                                setItem({ ...item.document, idProcedure: record._id })
                            }}
                            type="link"
                            placement="top" tooltip="Sửa" />
                        <Button icon={<CloudDownloadOutlined />}

                            placement="top" tooltip="Tải xuống" type="link" />
                    </>
                ),
            },
        ];
        return <Table
            size="small"
            // dataSource={dataColumn}
            columns={columns}
            pagination={{ pageSize: 5 }} scroll={{ y: 340 }}
        />;
    };
    const columns = [
        {
            title: 'Mã Quy Trình',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'date',
            key: 'date',
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

                        placement="top" tooltip="Tải xuống" type="link" />
                </>
            ),
        },
        {
            title: 'Xóa',
            dataIndex: 'id',
            key: 'id',
            render: (id) =>
            (
                <Popconfirm title="Bạn có chắc muốn xóa?"
                    okText="Có" cancelText="Không" onConfirm={() => handleDelete(id)} >
                    <Button icon={<DeleteOutlined />} placement="top" tooltip="Xóa" type="link" />
                </Popconfirm>
            )
        },
    ];
    return (
        <>
            <Button
                type="primary"
                style={{ marginBottom: 16, }}
                icon={<FolderAddOutlined />}
                text={"Thêm Quy Trình"}
                onClick={() => {
                    setVisible(true)
                    setAction("add")
                }}
            >
            </Button>
            <Table
                size="middle"
                pagination={{ pageSize: 5 }} scroll={{ y: 340 }}
                expandedRowRender={expandedRowRender}
                dataSource={items}
                columns={columns} />
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
        </>
    )
}
export default Procedure;