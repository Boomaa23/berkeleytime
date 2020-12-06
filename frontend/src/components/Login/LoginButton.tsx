import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { Nav } from 'react-bootstrap';
import { useLogin } from '../../graphql/hooks/user';
import { useHistory } from 'react-router';
import BTLoader from 'components/Common/BTLoader';

const CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  (process.env.NODE_ENV === 'production'
    ? '634751923298-s21r1ph48c2bvcser7thbsd368udknqt'
    : '***REMOVED***');

type Props = {
  hideLogin: () => void
};

const LoginButton = ({ hideLogin }: Props) => {
  const [login, { loading }] = useLogin();
  const history = useHistory();

  function onSignIn(response: GoogleLoginResponse) {
    const tokenId = response.tokenId;
    login({
      variables: {
        token: tokenId,
      },
    }).then((result) => {
      // If the login was successful.
      if (result.data?.login?.user) {
        history.push('/profile');
      }
    });
    hideLogin();
  }

  if (loading) {
    return <BTLoader />;
  }

  // TODO: potentially add loading state for this button?
  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      render={(renderProps) => (
        <Nav.Link
          className="login-btn bt-bold"
          eventKey={6}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img className="login-img" src={btn_google_signin} />
        </Nav.Link>
      )}
      onSuccess={
        onSignIn as (
          response: GoogleLoginResponse | GoogleLoginResponseOffline
        ) => void
      }
      onFailure={(error) =>
        alert('Sign-in failed with ' + JSON.stringify(error))
      }
      cookiePolicy="single_host_origin"
      scope="https://www.googleapis.com/auth/calendar"
      hostedDomain="berkeley.edu"
    />
  );
};

export default LoginButton;
