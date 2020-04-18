import React from 'react';
import { connect } from 'react-redux';

import EditForm from "./editForm";
import Header from "../app/header";


class EditPage extends React.Component {
    render() {
        return (
            <div className='ui container'>
                <Header/>
                <div className='ui segments'>
                    <div className='ui center aligned segment'>
                        <h2>Edit Created Urls</h2>
                    </div>
                    <div className='ui basic segment'>
                    </div>
                    <div className='ui basic left aligned segment'>
                        <EditForm/>
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
