import React, { Component } from 'react';


class Table extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        const statisticInfo = this.props.statisticInfo;

        return (

            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">minExchange</th>
                        <th scope="col">maxExchange</th>

                        <th scope="col">arithmeticMean</th>
                        <th scope="col">standardDeviation</th>
                        <th scope="col">countLostExchanges</th>
                        <th scope="col">mode</th>

                        <th scope="col">startDateTime</th>
                        <th scope="col">computeAllExecTime</th>
                        <th scope="col">computeExecTime</th>
                    </tr>
                </thead>
                <tbody>
                    {statisticInfo.map((item, index) => (
                        <tr key={index.toString()}>
                            <th scope="row">{index}</th>
                            <td>{item.id}</td>
                            <td>{item.minExchange}</td>
                            <td>{item.maxExchange}</td>
                            <td>{item.arithmeticMean}</td>
                            <td>{item.standardDeviation}</td>
                            <td>{item.countLostExchanges}</td>
                            <td style={{ overflow: "auto", maxWidth: "200px" }}>{item.mode}</td>
                            <td>{item.startDateTime}</td>
                            <td>{item.computeAllExecTime}</td>
                            <td>{item.computeExecTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        )


    }
}


export default Table;

