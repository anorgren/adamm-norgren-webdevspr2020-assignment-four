import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';

import { deleteShortenedUrl } from "../../actions/deleteUrlActions";
import './delete.css'


class DeleteForm extends React.Component {
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className=" ui tiny error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = (formProps) => {
        const className= `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input}
                       autoComplete="off"
                       placeholder="The shortened url ending of the resource to be deleted"
                />
                <div>{this.renderError(formProps.meta)}</div>
            </div>
        );
    };

    renderErrorMessage = () => {
        let message;
        if(this.props.deleteMessage) {
            message = this.props.deleteMessage
        }
        return (
            <div className='ui basic center aligned segment'>
                {message}
            </div>
        )
    };

    onSubmit = (formValues) => {
       this.props.deleteShortenedUrl(formValues.urlCode);
    };

    renderDefaultValue = () => {
        if (this.props.queryValue) {
            return this.props.queryValue;
        } else {
            return "The shortened url ending of the resource to be deleted"
        }
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui error form">
                <Field name="urlCode"
                       component={this.renderInput}
                       label='Url Code'
                       placeholder={this.renderDefaultValue()}
                />
                {this.renderErrorMessage()}
                <div className='ui segment basic center aligned bottom-component'>
                    <button className='ui button primary'
                            onClick={this.props.handleSubmit(values => {
                                this.onSubmit(values)
                            })}>
                        <i className="trash can icon"/>
                        Delete Url
                    </button>
                </div>
            </form>
        )
    }
}

const mapStateToProps  = (state, formProps) => {
    return {
        deleteMessage: state.deleteUrl.deleteMsg,
        initialValues: {urlCode: formProps.queryValue}
    }
};


const validate = (formValues) => {
    const errors = {};
    if (!formValues.urlCode) {
        errors.urlCode = "You must enter a valid url code."
    }
    if(formValues.urlCode && /\s/.test(formValues.urlCode)) {
        errors.urlCode = "Branded term cannot contain any whitespace"
    }
    return errors;
};

export default connect(mapStateToProps, { deleteShortenedUrl })(reduxForm({
    form: "deleteForm",
    validate: validate,
    destroyOnUnmount: false,
})(DeleteForm));