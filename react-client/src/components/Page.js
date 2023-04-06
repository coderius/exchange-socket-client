// Main page
import React, { Component } from 'react';
import Table from './Table';
import ListGroup from './ListGroup';
import Alert from './Alert';
import { connect } from 'react-redux';
import { SOCKET_SERVER_ENDPOINT } from '../config/app';
import { computeMin, computeMax, currentDateTime, getFullDate, computeTime, arithmeticMean, standardDeviation, countLostExchanges, getMode } from '../helpers/statisticComputeHelper';
import { saveCurrent, saveToMysql, showListGroup, showTable, calcConfigModeCount, calcConfigItemsCount, stateWssOpen, setMessage } from '../store/actions/processActions';


class Page extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getStatistic = this.getStatistic.bind(this);
        this.hendlerStart = this.hendlerStart.bind(this);

        this.state = {};
    }

    //Input set number change hendler
    handleChange(event) {
        console.log("Input changed!", event.target.value);
        let value = event.target.value;
        value = value.replace(/[^0-9]/g, '');//only numbers
        this.props.calcConfigItemsCount(value); //to redux
    }


    //Start click
    hendlerStart() {
        console.log("Click start!");

        this.setShowTable(false);
        this.setShowListGroup(true);

        const responseCollection = [];
        var startDate = null;

        const statistic = {};//Formatted to save in state

        this.ws = new WebSocket(SOCKET_SERVER_ENDPOINT);

        this.ws.onopen = () => {
            console.log("Connection WebSocket Open!");
            this.props.stateWssOpen(true); //redux
        };

        var i = 1;
        this.ws.onmessage = (event) => {
            //Get exchange data from server
            if (i > this.props.reduxState.configItems) {
                // this.ws.close();
            } else {
                responseCollection.push(JSON.parse(event.data));
                console.log("Get items", responseCollection);
                i++;

                if (startDate === null) {
                    startDate = currentDateTime();
                }

                //Count to calc mode by equals
                //Redux state
                const modeCount = this.props.reduxState.configModeCount;

                statistic.startDateTime = getFullDate(startDate);
                var start = new Date();
                statistic.minExchange = computeMin(responseCollection);
                statistic.maxExchange = computeMax(responseCollection);
                statistic.arithmeticMean = arithmeticMean(responseCollection);
                statistic.standardDeviation = standardDeviation(responseCollection);
                statistic.countLostExchanges = countLostExchanges(responseCollection);
                statistic.mode = getMode(responseCollection, modeCount).join(', ');
                statistic.computeExecTime = computeTime(start);
                statistic.computeAllExecTime = computeTime(startDate);

                this.props.saveCurrent(statistic); //to redux
            }
        }
        this.ws.onerror = (event) => {
            console.log("WS Error", event);
        };
    }

    setShowListGroup(status) {
        this.props.showListGroup(status);
    }

    setShowTable(status) {
        this.props.showTable(status);
    }

    //Statistic click
    getStatistic() {
        console.log("Click statistic button!");
        if (this.props.reduxState.isWssOpen) {
            this.setShowListGroup(false);
            this.setShowTable(true);
            this.ws.onclose = () => {
                console.log("Connection Closed!");
                this.props.stateWssOpen(false); //redux
                const data = this.props.reduxState.currentStatictic;//calcConfigModeCount
                this.props.saveToMysql(data); //to redux

            };
            this.ws.close();
        } else {
            this.props.setMessage("Press button 'Start'");
        }


    }

    render() {

        let listGroup;
        let table;
        let alert;

        if (this.props.reduxState.showListGroup) {
            listGroup = <ListGroup statisticInfo={this.props.reduxState.currentStatictic} modeCount={this.props.reduxState.configModeCount}></ListGroup>;
        }

        if (this.props.reduxState.showTable) {
            table = <Table statisticInfo={this.props.reduxState.result}></Table>;
        }

        if (this.props.reduxState.message.length > 0) {
            alert = <Alert message={this.props.reduxState.message}></Alert>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="display-5 App-pagename">Exchange app</div>
                        <div className="App-actionbar">
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">number of quotes</span>
                                <input onChange={this.handleChange} value={this.props.reduxState.configItems} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <button onClick={this.hendlerStart} type="button" className="btn btn-primary">Start</button>
                            <button onClick={this.getStatistic} type="button" className="btn btn-success ms-2">Get statistic</button>
                        </div>
                    </div>
                    <div className="col-12">
                        {alert}
                        {listGroup}
                        {table}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reduxState: state.processRedus,
});


export default connect(mapStateToProps, { saveCurrent, saveToMysql, showListGroup, showTable, calcConfigModeCount, calcConfigItemsCount, stateWssOpen, setMessage })(Page);