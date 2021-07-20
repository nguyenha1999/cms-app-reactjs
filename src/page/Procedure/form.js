import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../component/Button/button";
import { Row, Col, message, Spin, List, Avatar, Checkbox } from 'antd';
import { createProcedure, editProcedure, getListProcedure } from "../../redux/action/group";
import { getListDocument } from "../../redux/action/doc";
import InfiniteScroll from 'react-infinite-scroller';

const Form = ({ handleClose, action, item }) => {

    const onSubmit = () => {
    }
    return (
        <div className="position-relative">

            <Row gutter={16}>
                <Col md={24}>
                    <div className="procedure-infinite-container">
                        <Checkbox >
                            Tất cả
                        </Checkbox>
                        <InfiniteScroll

                        >
                            <List
                            >
                                <List.Item className="pointer"
                                >
                                    <Checkbox />

                                </List.Item>

                            </List>
                        </InfiniteScroll>
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
