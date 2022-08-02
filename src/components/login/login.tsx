import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/reducers/authReducer';
import { AppStateType } from '../../redux/store';

type DataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}


export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: AppStateType) => state.auth.isAuth)
  const errorAuth = useSelector((state: AppStateType) => state.auth.errorText)
  const captcha = useSelector((state: AppStateType) => state.auth.captchaUrl)


  const { register, setError, handleSubmit, formState: { errors } } = useForm();



  const onSubmit: SubmitHandler<DataType> = ({ email, password, rememberMe, captcha }) => {
    dispatch(login(email, password, rememberMe, captcha))
  }

  React.useEffect(() => {
    if (errorAuth !== '') {
      setError("password", { type: "focus" }, { shouldFocus: true });
    }
  }, [errorAuth, setError])


  if (auth) {
    return <Redirect to={'/profile'} />

  } else return (

    <>
      <h1>Login</h1>
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type="email" placeholder='login'{...register("email", { required: true })} />
          {errors.email && <span> This field is required</span>}
        </div>
        <div> <input type="password" placeholder='password'{...register("password", { required: true })} />
          {errorAuth !== ''
            ?
            errors.password && <span> {errorAuth}</span>
            :
            errors.password && <span> This field is required</span>
          }
        </div>

        <div>
          {
            captcha !== '' && <img src={captcha} alt="Captcha" />
          }
          {
            captcha !== '' && <input type="captcha" placeholder='captcha'{...register("captcha", { required: true })} />
          }
        </div>

        <div>
          <label htmlFor="rememberMe">rememberMe</label>
          <input
            type="checkbox"
            {...register("remmemberMe")}
          />
        </div>
        <div>
          <button >Login</button>
        </div>
      </form>
    </>
  );
}

