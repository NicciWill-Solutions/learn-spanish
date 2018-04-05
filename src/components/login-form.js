import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../actions/auth';
import {required, nonEmpty, isTrimmed} from '../validators';
import {Link} from 'react-router-dom';
import Input from './input';
import './login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        const error = this.props.error ? (
            <div className="form-error">
                {this.props.error}
            </div>
        ) : (
            <div className="form-error"></div>
        );

        return (
            <div className="login-container">
                {error}

                <form
                    className="login-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>

                    <Field
                        label="Username | Usuario"
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty, isTrimmed]}
                    />

                    <Field
                        label="Password | Contraseña"
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty, isTrimmed]}
                    />

                    <button 
                        className="login-button" 
                        disabled={this.props.pristine || this.props.submitting}>
                    <i className="fas fa-key"></i> Log in | Iniciar sesión
                    </button>
                </form>
                
                <Link to="/register">Register | Registro</Link>
                
                <hr/>
                <div>
                    Please click 'Register' above to<br/> create an account or login using:<br/>
                    <p className="demo">
                        Username: demo<br/>
                        Password: demoaccount
                    </p>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => 
        dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);
