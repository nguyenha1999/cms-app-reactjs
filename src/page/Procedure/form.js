import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../component/Button/button";
import { Row, Col, message, List, Checkbox } from 'antd';
import { getListDocument } from "../../redux/action/doc";

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
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        dispatch(getListDocument(model))
    }
        , [model])

    useEffect(() => {
        if (!item) return;
        setIdSelected(item.documents.map(x => x.document.id));
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
            setIdSelected(items.map(x => x.id));
        }
    }

    const onSubmit = () => {
        handleClose();
    };

    return (
        <div className="position-relative">
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
                                <List.Item key={item.id} className="pointer"
                                    onClick={() => chageSelected(item.id)}
                                >
                                    <Checkbox checked={idSelected.includes(item.id)} />
                                    <span>{item.docname}</span>
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