import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
// import "./index.scss";
// import Particles from 'react-particles-js';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from '../../store/actions/User';
// import { useHistory } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <Form
                className="form-login"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
            >
                <h2 className="text-center mb-4 fs-4 fw-bold">
                    Đăng nhập Hệ thống quản trị
                </h2>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tài khoản !',
                        },
                    ]}
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Input
                        name="email"
                        placeholder="Tài khoản"
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
                        name="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <div className="d-flex justify-content-between">
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Checkbox checked>Nhớ tài khoản</Checkbox>
                    </Form.Item>
                    <a href="#" className="mt-2">Quên mật khẩu ?</a>
                </div>

                <Button type="primary" htmlType="submit" className="w-100"
                >
                    Đăng nhập
                </Button>
            </Form>
        </div>
    )
}

export default Login
