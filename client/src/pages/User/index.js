import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Popconfirm, Badge, Dropdown, message } from 'antd';
import {
    DeleteOutlined, EditOutlined,
    FolderAddOutlined, ReloadOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Search from 'antd/lib/input/Search';
import { deleteUser, filterUser, getListUser, updateUser } from '../../store/actions/User';
import ModalAddUser from './components/ModalAddUser';
import ModalEditUser from './components/ModalEditUser';
import { startActionWithPromise } from '../../helpers/saga-promise-helpers';

const getCharLastName = (name) => {
    let splitName = name.split(" ");
    if (splitName.length) {
        return splitName[splitName.length - 1][0].toUpperCase();
    }
    return "X"
}

const User = () => {
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const dispatch = useDispatch()

    let users = useSelector(state => state.user.users) ?? [];
    console.log(users, 'users')
    const [loading, setLoading] = useState(false);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const showModalAddUser = () => {
        setIsModalAddVisible(true);
    };
    const color = Math.floor(Math.random() * ColorList.length);
    const [userEdit, setUserEdit] = useState(0)

    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const showModalEditUser = (user) => {
        setIsModalEditVisible(true);
        setUserEdit(user)
    };

    const [filter, setfilter] = useState({});

    const handleFilterChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setfilter({ ...filter, [name]: value })
    }

    const handleSearch = () => {
        dispatch(filterUser(filter))
    }


    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await startActionWithPromise(deleteUser, { id }, dispatch);
            setLoading(false);
            message.success('Xóa thành công');
        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error('Xóa không thành công');
        }
    }

    useEffect(() => {
        dispatch(getListUser());
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '50px',
            render: (_, record) =>
            (
                <Avatar className="custom-icon"
                    size={40}
                    style={{
                        backgroundColor: '#ed136e',
                        border: '2px solid #fff',
                        fontSize: 14
                    }}

                >
                    {getCharLastName(record.lastName)}
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
                    {record.totalUpload ?? 0}
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
                    {record.totalDownload ?? 0}
                </span>
            )
        },
        {
            title: 'Hành động',
            width: '10%',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) =>
            (
                <Fragment>

                    <Button icon={<EditOutlined />} type={"link"}
                        onClick={() => { showModalEditUser(record) }}

                    />

                    <Popconfirm title="Bạn có muốn xóa người dùng này không ?"
                        onConfirm={() => { handleDelete(record._id) }}
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
                        onClick={() => {
                            showModalAddUser(true);
                        }}
                    >
                    </Button>
                    <Button
                        className="mx-1 bg-success text-white"
                        icon={<ReloadOutlined />}
                        onClick={() => dispatch(getListUser())}
                    />
                </div>
                <div>
                    <Search style={{ width: 250 }} placeholder="Tìm kiếm người dùng" enterButton loading={false}
                        name={"q"}
                        onChange={handleFilterChange}
                        onSearch={handleSearch}
                    />
                </div>

            </div>

            <Table bordered dataSource={users} columns={columns} />

            <ModalAddUser
                isModalVisible={isModalAddVisible}
                setIsModalVisible={setIsModalAddVisible}
            />

            <ModalEditUser
                isModalVisible={isModalEditVisible}
                setIsModalVisible={setIsModalEditVisible}
                userEdit={userEdit}
            />

        </div>
    )
}
export default User;
