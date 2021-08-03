import { Button, Card, Form, Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/actions/User'
import './index.scss'

const Profile = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.user)
    const [user, setUser] = useState({
        email: '',
        password: '******',
    })

    const handlerInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, [name]: value })
    }


    const handlerUpdateProfile = async () => {
        dispatch(updateProfile(user))
    };

    return (
        <Fragment>
            <Card className="mx-auto text-center position-relative pt-5" style={{ width: 400 }}>
                <div className="position-absolute top-0 start-0 w-100 py-5" style={{ background: "#74b9ff" }}>
                </div>
                <div>
                    <Avatar className="custom-icon"
                        size={50}
                        style={{
                            backgroundColor: '#1890ff',
                            border: '2px solid #fff'
                        }}
                    >
                        {userInfo?.lastName && userInfo.lastName[0]?.toUpperCase()}
                    </Avatar>
                    <h2 className="mt-1">{userInfo.fullName}</h2>
                    <h4 className="mt-1">{userInfo.email}</h4>
                </div>
                <Form onFinish={handlerUpdateProfile} >
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
                        defaultValue={user.password}
                    >
                        <div className="form-item-profile mt-2">
                            <Input.Password
                                name="password"
                                onChange={handlerInputChange}
                                defaultValue={user.password}
                            />
                        </div>
                    </Form.Item>
                    <div className="d-flex justify-content-end pt-3">
                        <Button htmlType="submit">
                            Cập nhật
                        </Button>
                    </div>
                </Form>

            </Card>
        </Fragment>
    )
}
export default Profile;