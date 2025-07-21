import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();  

  return (
    <div id="error-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Status: {error.data.status}</i>
      </p>
      <p>
        <i>Message: {error.data.message}</i>
      </p>
    </div>
  );
}