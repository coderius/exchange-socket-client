// Main page
import React, { Component } from 'react';
import Table from './Table';
import ListGroup from './ListGroup';
import Alert from './Alert';
import { connect } from 'react-redux';
import { SOCKET_SERVER_ENDPOINT  } from '../config/app';
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
                    startDate = this.currentDateTime();
                }

                //Count to calc mode by equals
                //Redux state
                const modeCount = this.props.reduxState.configModeCount;

                statistic.startDateTime = this.getFullDate(startDate);
                var start = new Date();
                statistic.minExchange = this.computeMin(responseCollection);
                statistic.maxExchange = this.computeMax(responseCollection);
                statistic.arithmeticMean = this.arithmeticMean(responseCollection);
                statistic.standardDeviation = this.standardDeviation(responseCollection);
                statistic.countLostExchanges = this.countLostExchanges(responseCollection);
                statistic.mode = this.getMode(responseCollection, modeCount).join(', ');
                statistic.computeExecTime = this.computeTime(start);
                statistic.computeAllExecTime = this.computeTime(startDate);

                // this.setState({
                //     statistic: statistic,
                // });

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


    //--------------------------------------------------------------------------------
    //Helpers
    //--------------------------------------------------------------------------------
    computeMin(array) {
        let item = array.reduce((prev, curr) => prev.value < curr.value ? prev : curr);
        return item.value;
    }

    computeMax(array) {
        let item = array.reduce((prev, curr) => prev.value > curr.value ? prev : curr);
        return item.value;
    }

    currentDateTime() {
        return new Date();
    }

    //Set new Date()
    getFullDate(date) {

        return date.getDate() + "/"
            + (date.getMonth() + 1) + "/"
            + date.getFullYear() + " @ "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();

    }

    //Set start = Date()
    computeTime(start) {
        return (new Date() - start) / 1000; //seconds;
    }

    arithmeticMean(array) {
        // return array.reduce((partial_sum, a) => partial_sum.value + a.value, 0) / array.length;
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i].value;
        }
        return sum / array.length;
    }

    standardDeviation(array) {
        var i,
            j,
            total = 0,
            mean = 0,
            diffSqredArr = [];

        for (i = 0; i < array.length; i += 1) {
            total += array[i].value;
        }

        mean = total / array.length;

        for (j = 0; j < array.length; j += 1) {
            diffSqredArr.push(Math.pow((array[j].value - mean), 2));
        }
        return (Math.sqrt(diffSqredArr.reduce(function (firstEl, nextEl) {
            return firstEl + nextEl;
        }) / array.length));


    }

    countLostExchanges(array) {
        const emptyValues = ["", null];
        return Object.values(array).reduce((r, c) => r + emptyValues.includes(c.value), 0);
    }

    getMode(array, copies) {
        var reformattedArray = array.map(({ key, value }) => (value))
        array = reformattedArray;
        let map = new Map();
        for (let elem of array) {
            let counter = map.get(elem);
            map.set(elem, counter ? counter + 1 : 1);
        }
        let res = [];
        for (let [elem, counter] of map.entries())
            if (counter >= copies)
                res.push(elem);
        return res;
    }

    //--------------------------------------------------------------------------------
    //Helpers
    //--------------------------------------------------------------------------------


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
        }else{
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

        if (this.props.reduxState.message.length >  0) {
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


// export default Page;
const mapStateToProps = (state) => ({
    reduxState: state.processRedus,
});


export default connect(mapStateToProps, { saveCurrent, saveToMysql, showListGroup, showTable, calcConfigModeCount, calcConfigItemsCount, stateWssOpen, setMessage })(Page);