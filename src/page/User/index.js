import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Popconfirm, Badge, Dropdown, message } from 'antd';
import {
    DeleteOutlined, EditOutlined,
    FolderAddOutlined, ReloadOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Search from 'antd/lib/input/Search';

const Users = () => {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: '50px',
        },
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '50px',
            render: (_, record) =>
            (
                <Avatar className="custom-icon"
                    size={40}
                    style={{
                        backgroundColor: '#1890ff',
                        border: '2px solid #fff',
                        fontSize: 14
                    }}
                >
                </Avatar>
            )
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Lượt đăng',
            dataIndex: 'totalUpload',
            key: 'totalUpload',
            width: '100px',
            render: (_, record) => (
                <span className="d-block text-center text-success fw-bold">
                </span>
            )
        },
        {
            title: 'Lượt tải ',
            dataIndex: 'totalDownload',
            key: 'totalDownload',
            width: '100px',
            render: (_, record) => (
                <span className="d-block text-center text-success fw-bold">

                </span>
            )
        },
        {
            title: 'Hành động',
            width: '10%',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) =>
            (
                <Fragment>

                    <Button icon={<EditOutlined />} type="link"
                        placement="top"
                        tooltip="Chỉnh sửa" />

                    <Popconfirm title="Bạn có muốn xóa người dùng này không ?"
                    >
                        <Button icon={<DeleteOutlined />} type={"link"}
                        />
                    </Popconfirm>
                </Fragment>
            )
        },
    ];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Button
                        type="primary"
                        style={{ marginBottom: 16, }}
                        icon={<FolderAddOutlined />}
                    >
                    </Button>
                    <Button
                        className="mx-1 bg-success text-white"
                        icon={<ReloadOutlined />}
                    />
                </div>
                <div>
                    <Search style={{ width: 250 }} placeholder="Tìm kiếm người dùng" enterButton loading={false}
                        name={"q"}
                    />
                </div>
            </div>
            <Table columns={columns} />
        </div>
    )
}
export default Users
