import { Card, Col, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BookFilled, HddFilled, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import CardOverview from './components/CardOverview'
import ColumnChart from './components/Chart/ColumnChart'
import TableOverview from './components/TableOverview'
import moment from 'moment'
import reportApi from '../../api/Report/ReportApi';

const enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }
    return dates;
};

const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD hh:mm');
const startOfMonthDmy = moment().clone().startOf('month').format('YYYY-MM-DD');
const listDates = enumerateDaysBetweenDates(moment(startOfMonth).add(-1, 'd'), moment().add(1, 'd'))
    .map(item => moment(item).format("DD/MM/YYYY"));

function getDataCurentMonth(data) {
    const dataCurentMonthIndex = data.findIndex(item => item.date == startOfMonthDmy);
    if (dataCurentMonthIndex != -1) {
        return data.slice(dataCurentMonthIndex).map(item => item.count);
    }
    return [];
}

function fillDataChart(data) {
    return {
        document: getDataCurentMonth(data.document),
        procedure: getDataCurentMonth(data.procedure),
        upload: getDataCurentMonth(data.upload),
        download: getDataCurentMonth(data.download),
    }
}

const Home = () => {

    const [top5DocumentDownload, setTop5DocumentDownload] = useState([])
    const [dataCarts, setDataCarts] = useState({})
    const [dataChart, setDataChart] = useState({})

    useEffect(() => {
        Promise.all(
            [
                reportApi.overview(),
                reportApi.top5DocumentDownload(),
            ])
            .then(data => {
                setDataChart(fillDataChart(data[0]));
                setDataCarts(data[0])
                setTop5DocumentDownload(data[1]);
            })
            .catch(e => {
                notification.error({
                    message: 'Thông báo',
                    description: 'Lỗi: ' + e.message
                });
            })
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={6}>
                    <CardOverview
                        title={"Tài liệu"}
                        icon={<BookFilled style={{ fontSize: 30, color: '#16a085' }} />}
                        action={"document"}
                        data={dataCarts.document}
                    />
                </Col>
                <Col span={6}>
                    <CardOverview
                        title={"Quy trình"}
                        icon={<HddFilled style={{ fontSize: 30, color: '#2980b9' }} />}
                        action={"procedure"}
                        data={dataCarts.procedure}
                    />
                </Col>
                <Col span={6}>
                    <CardOverview
                        title={"Lượt đăng"}
                        icon={<UploadOutlined style={{ fontSize: 30, color: '#27ae60' }} />}
                        action={"upload"}
                        data={dataCarts.upload}
                    />
                </Col>
                <Col span={6}>
                    <CardOverview
                        title={"Lượt tải"}
                        icon={<DownloadOutlined style={{ fontSize: 30, color: '#e67e22' }} />}
                        action={"download"}
                        data={dataCarts.download}
                    />
                </Col>
            </Row>
            <div className="row mt-5">
                <div className="col-6">
                    <ColumnChart
                        categories={listDates}
                        series={[
                            {
                                name: "Tài liệu",
                                data: dataChart.document ?? []
                            },
                            {
                                name: "Quy trình",
                                data: dataChart.procedure ?? []
                            },
                            {
                                name: "Lượt đăng",
                                data: dataChart.upload ?? []
                            },
                            {
                                name: "Lượt tải",
                                data: dataChart.download ?? []
                            },
                        ]}
                    />
                </div>
                <div className="col-6">
                    <TableOverview
                        data={top5DocumentDownload}
                    />
                </div>
            </div>
        </div >
    )
}
export default Home;
