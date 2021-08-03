import React, { useState } from 'react';
import Modal from "./../Modal";
import PropTypes from 'prop-types';
import Loading from "./../Loading";

export default function Index({ url, visible, setVisible, width }) {
    const [loading, setLoading] = useState(true);

    const getUrl = () => {
        const defaultUrl = [
            "https://fbchat2.ecrm.vn/uploads/fbchat2/facebook/2021/07/09/compressed-tracemonkey-pldi-09.pdf",
            "https://fbchat2.ecrm.vn/uploads/fbchat2/facebook/2021/07/08/b1-2.docx"
        ];
        const index = Math.floor(Math.random() * 2);
        return defaultUrl[index];
    }
    return (
        <Modal
            title={"Xem File"}
            width={width}
            visible={visible}
            onCancel={() => {
                setVisible()
            }}
            onOk={() => { console.log("dsad") }}
        >
            <Loading show={loading} />
            <div>
                <iframe
                    width="100%"
                    height="600"
                    onLoad={() => setLoading(false)}
                    src={`https://docs.google.com/gview?url=${getUrl()}&embedded=true`} frameBorder="0"
                >
                </iframe>
            </div>
        </Modal>

    )
}
Index.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    setVisible: PropTypes.bool,
    width: PropTypes.number,
    url: PropTypes.string
}
Index.defaultProps = {
    width: 1200,
}