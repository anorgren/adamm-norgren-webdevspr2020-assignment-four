import React from 'react';
import { connect } from 'react-redux';

import EditForm from "./editForm";


class EditPage extends React.Component {
    render() {
        return (
            <div className='ui container'>
                <div className='ui segments'>
                    <div className='ui center aligned segment'>
                        <h2>Update An Existing Url</h2>
                    </div>
                    <div className='ui basic segment'>
                    </div>
                    <div className='ui basic left aligned segment'>
                        <EditForm queryValue={this.props.queryVal}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        editMessage: state.editedUrl.editedUrl,
        deleteMessage: state.deleteUrl.deleteMessage
    }
};

export default connect(mapStateToProps)(EditPage);
