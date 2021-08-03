import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "./../../../components/Button";
import { Row, Col, message, List, Checkbox } from 'antd';
import { createProcedure, editProcedure } from "./../../../store/actions/Procedure";
import { getListDocument } from "./../../../store/actions/Document";
import { startActionWithPromise } from './../../../helpers/saga-promise-helpers';
import Loading from "./../../../components/Loading";
import "./index.scss";

const Form = ({ handleClose, action, item }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [idSelected, setIdSelected] = useState([]);

    const items = useSelector(state => state.document.items);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: ""
    });

    useEffect(async () => {
        let mounted = true;
        if (mounted) {
            setLoading(true);
            try {
                const data = await startActionWithPromise(getListDocument, model, dispatch);
                setLoading(false);
                if (data.data.length == 0) {
                    setHasMore(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setHasMore(false);
            }
        }
        return () => mounted = false;
    }, [model.page])

    useEffect(() => {
        if (!item) return;
        setIdSelected(item.documents.map(x => x.document._id));
    }, [item])

    const chageSelected = (id) => {
        if (idSelected.includes(id)) {
            setIdSelected(idSelected.filter(x => x != id));
        } else {
            setIdSelected([id, ...idSelected]);
        }
    }

    const checkAll = () => {
        if (idSelected.length == items.length) {
            setIdSelected([]);
        } else {
            setIdSelected(items.map(x => x._id));
        }
    }

    const onSubmit = async (data) => {
        if (idSelected.length == 0) {
            message.error('Bạn cần chọn tài liệu');
            return;
        }
        setLoading(true);
        data = {
            documentIds: idSelected
        }
        try {
            if (action == "add") {
                await startActionWithPromise(createProcedure, data, dispatch);
                message.success('Thêm mới thành công');
            } else {
                await startActionWithPromise(editProcedure,
                    { ...data, _id: item._id }, dispatch);
                message.success('Sửa thành công');
            }

        } catch (error) {
            if (action == "add") {
                message.error('Thêm mới không thành công');
            } else {
                message.error('Sửa không thành công');
            }
        }
        setLoading(false);
        handleClose();
    };
    console.log(idSelected, "idSelected");
    return (
        <div className="position-relative">
            <Loading show={loading} />
            <Row gutter={16}>
                <Col md={24}>
                    <div className="procedure-infinite-container">
                        <Checkbox onChange={checkAll}
                            checked={idSelected.length == items.length}>
                            Tất cả
                        </Checkbox>
                        <List
                            dataSource={items}
                            renderItem={item => (
                                <List.Item key={item._id} className="pointer"
                                    onClick={() => chageSelected(item._id)}>
                                    <Checkbox checked={idSelected.includes(item._id)} />
                                    <span>{item.name}</span>
                                </List.Item>
                            )}
                        >
                        </List>
                    </div>
                </Col>
            </Row>
            <div className="d-flex mt-2">
                <Button text={action == "add" ? "Thêm" : "Sửa"} className="ml-auto"
                    onClick={() => onSubmit()}
                />
            </div>
        </div>
    )
}
export default Form;