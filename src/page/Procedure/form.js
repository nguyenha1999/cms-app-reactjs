import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../component/Button/button";
import { Row, Col, message, List, Checkbox } from 'antd';
import { getListDocument } from "../../redux/action/doc";

const Form = ({ handleClose, action, item }) => {


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