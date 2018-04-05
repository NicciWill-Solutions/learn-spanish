import React from 'react';
import {Field, reduxForm, focus } from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import './registration-form.css';
import {Link} from 'react-router-dom';
import Input from './input';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password} = values;
        const user = {username, password};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className="registration-container">
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
                        validate={[required, nonEmpty, isTrimmed]}
                    />

                    <Field
                        label="Password | Contraseña"
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, passwordLength, isTrimmed]}
                    />

                    <Field
                        component={Input}
                        label="Confirm password | Confirmar"
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matchesPassword]}
                    />

                    <button className="register-button"
                        type="submit"
                        disabled={
                            this.props.pristine ||
                            this.props.submitting
                        }
                        >
                        Register | Registro
                    </button>
                </form>
                <Link to="/">Login</Link>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
         dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
