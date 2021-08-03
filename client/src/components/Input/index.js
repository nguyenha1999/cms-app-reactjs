import React from 'react';
import { Input as AntdInput } from "antd";
import { Typography } from 'antd';
import PropTypes from 'prop-types';
const { Text } = Typography;

function Index({ label, name, control, defaultValue, error, onChange, value, placeholder }) {

    return (
        <div>
            {
                label && <label className="mb-1 d-flex" htmlFor={name}>{label}</label>
            }
            <AntdInput
                value={value}
                onChange={onChange}
                id={name}
                defaultValue={defaultValue}
                name={name}
                control={control}
                className={error && 'input--danger'}
                placeholder={placeholder}
            />
            {
                error && <Text type="danger text--danger">{error.message}</Text>
            }
        </div>
    )
}
Index.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.object,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
}

Index.defaultProps = {
    placeholder: "",
}
export default Index;