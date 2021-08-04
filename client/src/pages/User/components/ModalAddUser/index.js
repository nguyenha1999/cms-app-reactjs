import { Form, Input, Modal, Button } from 'antd';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../../../../store/actions/User';

export default function ModalAddUser(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const formEl = useRef(null);
    const inputRef = useRef(null);

    const handleOk = () => {
        formEl.current.click();
    };

    const handleCancel = () => {
        props.setIsModalVisible(false);
    };

    const handlerInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    const [form] = Form.useForm();

    const handleAddUser = () => {
        props.setIsModalVisible(false);
        dispatch(addUser(user))
        setUser({})
        form.resetFields();
    }

    return (

        <Modal title="Thêm người dùng"
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="add-user"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleAddUser}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Email không hợp lệ !"
                        }
                    ]}
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Input
                        name="email"
                        onChange={handlerInputChange}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu !',
                        },
                    ]}
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Input.Password
                        ref={inputRef}
                        name="password"
                        placeholder="Mật khẩu"
                        onChange={handlerInputChange}
                    />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Họ không được bỏ trống !"
                        }
                    ]}
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Input
                        name="firstName"
                        onChange={handlerInputChange}
                        placeholder="Họ"
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Tên không được bỏ trống!"
                        }
                    ]}
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Input
                        name="lastName"
                        onChange={handlerInputChange}
                        placeholder="Tên"
                    />
                </Form.Item>
                <Button
                    ref={formEl}
                    htmlType="submit"
                />
            </Form>
        </Modal>
    )
}
