import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OauthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
    }
    navigate('/dashboard?tab=integrations');
// go back to integrations
  }, []);
  return null;
}
