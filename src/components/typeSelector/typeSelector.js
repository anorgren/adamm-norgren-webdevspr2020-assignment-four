import React from 'react';
import { connect } from 'react-redux';

import { requestBranded, requestUnbranded } from "../../actions/typeSelectorActions";
import "./typeSelector.css"

class TypeSelector extends React.Component {
    render() {
        return (
            <div className="ui buttons fluid">
                <button className="ui button gray" onClick={this.props.requestUnbrandedUrl}>
                    Unbranded
                </button>
                <div className="or"/>
                <button className="ui navy button" onClick={this.props.requestBrandedUrl}>
                    Branded
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestUnbrandedUrl: () => {
            dispatch(requestUnbranded())
        },
        requestBrandedUrl: () => {
            dispatch(requestBranded())
        }
    }

};

const mapStateToProps = state => {
    return {
        createBranded: state.urlType.isBranded
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeSelector);