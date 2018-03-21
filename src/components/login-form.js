import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Link} from 'react-router-dom';
import './login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div className="login-container">
                <form
                    className="login-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {/* {error} */}
                    {/* <label htmlFor="username">Username | Usuario</label> */}
                    <Field
                        placeholder="Username | Usuario"
                        component="input"
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty]}
                    />
                    {/* <label htmlFor="password">Password | Contraseña</label> */}
                    <Field
                        placeholder="Password | Contraseña"
                        component="input"
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                    />
                    <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                    <i className="fas fa-key"></i> Log in | Iniciar sesión
                    </button>
                </form>
                <Link to="/register">Register | Registro</Link>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
