import { Form, Input, Modal, Button } from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../store/actions/User';

function ModalEditUser(props) {

    const dispatch = useDispatch()
    const [user, setUser] = useState({
        id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        index: props.index,
    });

    useEffect(() => {
        setUser(props.userEdit)
    }, [props.userEdit])

    const handleOk = () => {
        props.setIsModalVisible(false);
        dispatch(updateUser(props.userEdit._id, { user }))
    };

    const handleCancel = () => {
        props.setIsModalVisible(false);
    };

    const handlerInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }


    return (
        <Fragment>
            <Modal title="Cập nhật người dùng"
                visible={props.isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    name="email"
                    className="mb-4"
                    value={user.email}
                    onChange={handlerInputChange}
                />
                <Input.Password
                    name="password"
                    className="mb-4"
                    placeholder="******"
                    onChange={handlerInputChange}
                />

                <Input
                    name="firstName"
                    className="mb-4"
                    value={user.firstName}
                    onChange={handlerInputChange}
                />

                <Input
                    name="lastName"
                    className="mb-4"
                    value={user.lastName}
                    onChange={handlerInputChange}
                />
            </Modal>
        </Fragment>
    )
}
export default ModalEditUser;