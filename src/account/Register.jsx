import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from 'helpers';
import { userActions, alertActions } from 'store';

export { Register };

function Register() {
    const dispatch = useDispatch();

    // form validation
    const validationSchema = Yup.object().shape({
        plateNumber: Yup.string()
            .required('Plate Number is required'),
        phoneNumber: Yup.string()
            .required('Phone Number is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Plate Number</label>
                        <input name="plateNumber" type="text" {...register('plateNumber')} className={`form-control ${errors.plateNumber ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.plateNumber?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input name="phoneNumber" type="text" {...register('phoneNumber')} className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link to="../login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    )
}
