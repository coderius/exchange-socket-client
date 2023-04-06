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
                <h5>Results</h5>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    minExchange:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.minExchange}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    maxExchange:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.maxExchange}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    arithmeticMean:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.arithmeticMean}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    standardDeviation:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.standardDeviation}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    countLostExchanges:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.countLostExchanges}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    mode (for {modeCount} equals):
                        <div style={{ overflow: "auto", maxWidth: "500px" }} className="badge bg-primary">{statisticInfo.mode}</div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    startDateTime:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.startDateTime}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    computeAllExecTime:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.computeAllExecTime} сек.</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                    computeExecTime:
                        <span className="badge bg-primary rounded-pill">{statisticInfo.computeExecTime} сек.</span>
                    </li>
                </ul>
            </div>

        )
        // }

    }
}


export default ListGroup;

