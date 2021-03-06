import React from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';

import { editShortenedUrl } from "../../actions/editUrlActions";
import { deleteShortenedUrl } from "../../actions/deleteUrlActions";


class EditForm extends React.Component {
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
                       placeholder="The shortened url ending of the resource to update"
                />
                <div>{this.renderError(formProps.meta)}</div>
            </div>
        );
    };

    renderMessage = () => {
        let message;
        if(this.props.url.editedUrl) {
            if(this.props.url.editedUrl.shortUrl) {
                message = `Successfully updated url. Your url: ${this.props.url.editedUrl.shortUrl}`
            } else {
                message = `Could not update provided url code. Please ensure url code exists.`
            }}
        return (
            <div className='ui basic center aligned segment'>
                {message}
            </div>
        )
    };


    onSubmit = (formValues) => {
        if (formValues.edit) {
            let urlObject = {
                originalUrl: formValues.newLinkUrl,
                urlCode: formValues.urlCode,
            };
            this.props.editShortenedUrl(urlObject);
        } else {
            this.props.deleteShortenedUrl(formValues.urlCode);
        }
    };

    renderDefaultValue = () => {
        if (this.props.queryValue) {
            return this.props.queryValue;
        } else {
            return "The shortened url ending of the resource to update"
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
                <Field name='newLinkUrl'
                       component={this.renderInput}
                       label='New Link Url'
                       placeholder="New url to link to current shortened url resource"
                />
                {this.renderMessage()}
                <div className="ui basic segment center aligned">
                    <button className='ui primary button'
                            onClick={this.props.handleSubmit(values => {
                                this.onSubmit({
                                    ...values, edit: true
                                })
                    })}>Update Url</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps  = (state, formProps) => {
    return {
        url: state.editedUrl,
        initialValues: {urlCode: formProps.queryValue}
    }
};


const validate = (formValues) => {
    const errors = {};
    if (!formValues.urlCode) {
        errors.urlCode = "You must enter a url code."
    }
    if (!formValues.newLinkUrl) {
        errors.newLinkUrl = "You must enter a url."
    } else {
        try {
            new URL(formValues.newLinkUrl)
        } catch (e) {
            errors.newLinkUrl = "You must enter a valid url with http(s) protocol"
        }
    }
    return errors;
};

export default connect(mapStateToProps, { editShortenedUrl, deleteShortenedUrl })(
    reduxForm({
        form: "editForm",
        validate: validate,
        destroyOnUnmount: false,
})(EditForm));