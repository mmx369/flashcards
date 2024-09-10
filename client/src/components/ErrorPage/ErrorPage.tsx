import { useNavigate, useRouteError } from 'react-router-dom';

import classes from './ErrorPage.module.css';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <h1 className={classes.error_h1}>Oops!</h1>
      <p className={classes.error_p}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={classes.error_p}>
        <i>{error.statusText || error.message}</i>
      </p>
      <button className={classes.error_button} onClick={() => navigate('/')}>
        Go to Home Page
      </button>
    </div>
  );
}
