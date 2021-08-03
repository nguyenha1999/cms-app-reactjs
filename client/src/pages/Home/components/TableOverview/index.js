import React from 'react'
import { Table, Tag, Space } from 'antd';

function TableOverview({ data }) {

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) =>
            (
                <span>{record.file.name.length > 40 ? record.file.name.substring(0, 40) + "..." : record.file.name}</span>
            )
        },
        {
            title: 'Tác giả',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) =>
            (
                <span>{record.downloadBy.fullName.length > 30 ? record.downloadBy.fullName.substring(0, 30) + "..." : record.downloadBy.fullName}</span>
            )
        },
        {
            title: 'Lượt tải',
            dataIndex: 'count',
            key: 'count',
        }
    ];

    return (
        <Table columns={columns} dataSource={data} pagination={false} />
    )
}
export default TableOverview;