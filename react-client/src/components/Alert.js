import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../store/actions/processActions';




class Alert extends Component {

    constructor(props) {
        super(props);
        this.hendlerClose = this.hendlerClose.bind(this);
    }

    hendlerClose(event){
        this.props.setMessage("");
    }
    
    render() {

        const message = this.props.message;

        return (
            <div style={{ marginTop: "20px" }} className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{message}</strong>
                <button onClick={this.hendlerClose} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )


    }
}


// export default Page;
const mapStateToProps = (state) => ({
    reduxState: state.processRedus,
});


export default connect(mapStateToProps, { setMessage })(Alert);