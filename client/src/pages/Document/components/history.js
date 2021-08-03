import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from "./../../../store/actions/History";
import { startActionWithPromise } from './../../../helpers/saga-promise-helpers';
import Loading from "./../../../components/Loading";
import { List, Avatar } from 'antd';
import moment from "moment";

const HOST = "http://localhost:3000/"

const Form = ({ id }) => {
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 25,
        search: ""
    });
    const items = useSelector(state => state.history.items);

    useEffect(async () => {
        setLoading(true);
        try {
            await startActionWithPromise(getListHistory, { ...model, id: id }, dispatch);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }, []);
    const index = Math.floor(Math.random() * ColorList.length);
    return (
        <div className="position-relative">
            <Loading show={loading} />
            <List
                bordered
                dataSource={items}
                renderItem={item => (
                    <List.Item>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Avatar style={{ backgroundColor: ColorList[index], verticalAlign: 'middle' }} >
                                        {item.user.fullName.charAt(0)}
                                    </Avatar>
                                    <span className="ml-2" style={{ fontWeight: "bold" }}>{item.user.fullName}</span>
                                </div>
                                <div>
                                    <span>{moment(item.createdDate).format('H:m:s MM/DD/YYYY')}</span>
                                </div>
                            </div>
                            <div className="ml-2">
                                {item.content}
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default Form;