/* eslint-disable no-dupe-keys */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';

const Index = ({ type, size, icon, text, className, onClick, style, placement, tooltip, children }) =>  {
    if (tooltip) {
        return (
            <Tooltip placement={placement} title={tooltip}>
                <Button
                    style={style}
                    className={className}
                    type={type}
                    size={size}
                    icon={icon || null}
                    onClick={onClick}
                >
                    {text}
                </Button>
            </Tooltip>
        )
    }
    return (
        <Button
            style={style}
            className={className}
            type={type}
            size={size}
            icon={icon || null}
            onClick={onClick}
        >
            {text} {children}
        </Button>
    )
}
export default Index;
Index.propTypes = {
    type: PropTypes.string, 
    size: PropTypes.string,
    loading: PropTypes.bool,
    icon: PropTypes.array,
    href: PropTypes.string,
    ghost: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    danger: PropTypes.bool,
    shape: PropTypes.string, 
    icon: PropTypes.elementType,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    tooltip: PropTypes.string,
}

Index.defaultProps = {
    type: "primary",
    size: "middle",
    shape: "round"
}
