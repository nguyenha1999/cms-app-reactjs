import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import "./index.scss";
import Particles from 'react-particles-js';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../store/actions/User';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {


    const token = useSelector(state => state.user.token);
    const login = useSelector(state => state.user.login);
    const userInfo = useSelector(state => state.user);

    const dispatch = useDispatch()
    const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handlerInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    const handlerRegisterUser = async () => {
        dispatch(userRegister(user))
    };

    useEffect(() => {
        if (token && login && userInfo) {
            history.push('/')
        }
    }, [token]);

    return (
        <div className="wraper">
            <div className="container">
                <Row>
                    <Col span={12}>
                        <div className="bg-image">
                        </div>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={8}>
                        <Card bordered={false} style={{ width: '100%' }} className="p-2">
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
                                onFinish={handlerRegisterUser}
                            >
                                <h2 className="text-center mb-4 fs-4 fw-bold">
                                    ????ng k?? t??i kho???n qu???n tr???
                                </h2>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p t??i kho???n !',
                                        },
                                    ]}
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Input
                                        name="email"
                                        onChange={handlerInputChange}
                                        placeholder="T??i kho???n"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p m???t kh???u !',
                                        },
                                    ]}
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Input.Password
                                        name="password"
                                        placeholder="M???t kh???u"
                                        onChange={handlerInputChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p m???t kh???u x??c nh???n !',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('M???t kh???u kh??ng kh???p!'));
                                            },
                                        })
                                    ]}
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Input.Password
                                        name="confirm"
                                        placeholder="Nh???p l???i m???t kh???u"
                                        onChange={handlerInputChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p h??? !',
                                        },
                                    ]}
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}

                                >
                                    <Input
                                        name="firstName"
                                        onChange={handlerInputChange}
                                        placeholder="H???"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui l??ng nh???p t??n !',
                                        },
                                    ]}
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}

                                >
                                    <Input
                                        name="lastName"
                                        onChange={handlerInputChange}
                                        placeholder="T??n"
                                    />
                                </Form.Item>
                                <Button htmlType="submit" className="w-100 text-white bg-success"
                                >
                                    ????ng k??
                                </Button>
                                <div className="mt-4 text-center">
                                    <Link to="/login">
                                        Quay v??? trang ????ng nh???p ?
                                    </Link>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="bg-overlay">
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 20,
                                "density": {
                                    "enable": true,
                                    "value_area": 1000
                                }
                            },
                            "color": {
                                "value": "#1e90ff"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#1e90ff",
                                "opacity": 1,
                                "width": 2
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    }} />

            </div>
        </div>
    )
}
export default Signup;