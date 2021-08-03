import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, Badge, Pagination, message } from 'antd';
import {
    DeleteOutlined, FolderViewOutlined, EditOutlined, CloudDownloadOutlined,
    ScheduleOutlined, FolderAddOutlined, MessageOutlined
} from '@ant-design/icons';
import {
    getListDocument, deleteDocument, downloadDocument
} from './../../store/actions/Document';
import Modal from "./../../components/Modal/index.js";
import Form from "./components/form";
import History from "./components/history";
import { startActionWithPromise } from './../../helpers/saga-promise-helpers';
import moment from "moment";
import Loading from "./../../components/Loading";
import Button from './../../components/Button';

const HOST = "http://localhost:3000"

const Document = () => {

    const dispatch = useDispatch();
    const items = useSelector(state => state.document.items);
    console.log(items, 'items')
    const total = useSelector(state => state.document.total);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    });
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("");
    const [item, setItem] = useState(null);
    const [modelHistory, setModelHistory] = useState({
        visible: false,
        id: null
    });

    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            setLoading(true);
            try {
                const value = await startActionWithPromise(getListDocument, model, dispatch);
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
            await startActionWithPromise(deleteDocument, { id }, dispatch);
            setLoading(false);
            message.success('Xóa thành công');
        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error('Xóa không thành công');
        }
    }

    const download = (item) => {
        if (!item) return;
        const token = localStorage.getItem('token');
        var link = document.createElement("a");
        link.href = `${HOST}/download/${item.file._id}?access_token=${token}`;
        link.download = item.file.name;
        link.click();
        link.remove();
    }

    const history = (item) => {
        setModelHistory({
            visible: true,
            id: item._id
        });
    }

    const columns = [
        {
            title: 'Mã Tài Liệu',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên Tài Liệu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lần Ban Hành ',
            dataIndex: 'edition',
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
            dataIndex: 'publishedDate',
            key: 'publishedDate',
            width: '20%',
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
            width: '18%',
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
                        onClick={() => download(record)}
                        placement="top" tooltip="Tải xuống" type="link" />
                    <Button icon={<MessageOutlined />}
                        onClick={() => history(record)}
                        placement="top" tooltip="Lịch sử" type="link" />
                </>

            ),
        },
        {
            title: 'Xoá',
            width: '10%',
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
                    text={"Thêm Tài Liệu"}
                >
                </Button>
            </div>

            <Table
                size="middle"
                dataSource={items}
                pagination={false}
                columns={columns} />
            <div className="d-flex mt-1">
                <Pagination
                    className="ml-auto"
                    defaultCurrent={model.page}
                    showColorChanger={false}
                    pageColor={5}
                    pageSize={model.pageSize}
                    total={total}
                    onChange={changePage}
                />
            </div>
            {
                visible &&
                (
                    <Modal
                        title={action == "add" ? "Thêm Tài Liệu" : "Sửa Tài Liệu"}
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
                modelHistory.visible &&
                (
                    <Modal
                        title={"Lịch sử"}
                        width={567}
                        visible={modelHistory.visible}
                        onCancel={() => {
                            setModelHistory({
                                visible: false,
                                id: null
                            })
                        }}
                        footer={null}
                    >
                        <div>
                            <History
                                id={modelHistory.id}
                                handleClose={() => {
                                    setModelHistory({
                                        visible: false,
                                        id: null
                                    })
                                }} />
                        </div>
                    </Modal>
                )
            }
        </div >
    )
}
export default Document;