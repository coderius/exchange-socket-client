import React, { Component } from 'react';


class ListGroup extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        const statisticInfo = this.props.statisticInfo;
        const modeCount = this.props.modeCount;

        return (

            <div className="processCalc">
                <h5>Текущие расчеты</h5>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Минимальний:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.minExchange}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Максимальный:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.maxExchange}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Среднее арифметическое:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.arithmeticMean}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Стандартное отклонение:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.standardDeviation}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Кол-во потерянных котировок:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.countLostExchanges}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Мода в мультимодальности (для {modeCount} совпадений):
                        <div style={{ overflow: "auto", maxWidth: "500px" }} className="badge bg-primary">{statisticInfo.mode}</div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Дата запуска расчета:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.startDateTime}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Время потраченное на расчеты вообще:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.computeAllExecTime} сек.</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Время потраченное на расчеты одного значения:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.computeExecTime} сек.</span>
                    </li>
                </ul>
            </div>

        )
        // }

    }
}


export default ListGroup;

