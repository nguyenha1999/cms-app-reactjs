import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

function Index({ children, title, width, visible, onOk, onCancel, footer }) {
    return (
        <>
            <Modal
                title={title}
                centered
                visible={visible}
                onOk={() => onOk()}
                onCancel={() => onCancel()}
                width={width}
                footer={null}
            >
                {children}
            </Modal>
        </>
    );
}
Index.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    width: PropTypes.number,
    footer: PropTypes.array,
}

Index.defaultProps = {
    placeholder: "",
}
export default Index;