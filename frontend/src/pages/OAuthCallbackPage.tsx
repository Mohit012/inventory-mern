import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/services/authSlice';
import decodeToken from '../utils/decodeToken'; // Assuming this can decode your JWT
import { toast } from 'sonner';
import Loader from '../components/Loader'; // Assuming you have a Loader component

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const oauthError = searchParams.get('oauthError');
    const message = searchParams.get('message');

    if (oauthError) {
      toast.error(message || 'OAuth login failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token) {
      try {
        const user = decodeToken(token); // Decode the token to get user info
        if (user) {
          dispatch(loginUser({ token, user }));
          toast.success('Successfully logged in with Google!');
          navigate('/'); // Navigate to dashboard or desired page
        } else {
          throw new Error('Invalid token received.');
        }
      } catch (error) {
        console.error('Error processing OAuth token:', error);
        toast.error('Failed to process login. Invalid token.');
        navigate('/login');
      }
    } else {
      // No token found, something went wrong
      toast.error('OAuth callback error: No token received.');
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loader /> 
      <p>Processing login...</p>
    </div>
  );
};

export default OAuthCallbackPage;