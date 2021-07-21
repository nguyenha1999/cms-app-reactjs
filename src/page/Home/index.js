import React, { useState } from 'react'
import ColumnChart from './Chart/index'
import moment from 'moment'


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
    const [dataChart, setDataChart] = useState({})
    return (

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
    )
}
export default Home;
