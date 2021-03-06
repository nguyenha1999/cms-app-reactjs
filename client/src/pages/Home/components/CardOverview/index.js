import { Card, Tooltip } from 'antd'
import React, { Fragment, useState } from 'react'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment'

const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');

function CardOverview(props) {

    const [total, setTotal] = useState(0)
    const [ratio, setRatio] = useState(0)

    if (props.data?.length) {
        const dataCurentMonthIndex = props.data.findIndex(item => item.date == startOfMonth);
        if (dataCurentMonthIndex != -1) {
            const dataLastMonth = props.data.splice(0, dataCurentMonthIndex);
            const dataCurentMonth = props.data.splice(dataCurentMonth);
            let totalLastMonth = dataLastMonth.map(item => item.count).reduce((prev, next) => prev + next);
            totalLastMonth = totalLastMonth == 0 ? 1 : totalLastMonth;
            const totalCurentMonth = dataCurentMonth.map(item => item.count).reduce((prev, next) => prev + next);
            setTotal(totalCurentMonth);
            setRatio(totalCurentMonth / totalLastMonth)
        }
    }

    const renderRatioIncrease = (ratio) => {
        return (
            <span className="fw-bold" style={{ color: '#27ae60' }}>
                <Fragment>
                    <CaretUpOutlined /> +  {ratio} %
                </Fragment>
            </span>
        )
    }

    const renderRatioDecrease = (ratio) => {
        ratio = -ratio;
        return (
            <span className="fw-bold" style={{ color: '#e74c3c' }}>
                <CaretDownOutlined /> - {ratio} %
            </span>
        )
    }

    return (

        <Card title={props.title} bordered={false}>
            <div className="position-absolute top-8-px end-8-px">
                {props.icon}
            </div>
            <h2>

                <Tooltip placement="topLeft" title={"Tổng số lượt trong tháng"}>
                    {total}
                </Tooltip>
            </h2>

            <Tooltip placement="topLeft" title={"Tỉ lệ so với tháng trước"}>
                {
                    ratio > 0
                        ?
                        renderRatioIncrease(ratio)
                        :
                        renderRatioDecrease(ratio)
                }
            </Tooltip>
        </Card>
    )
}
export default CardOverview;