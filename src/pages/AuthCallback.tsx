import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/', { replace: true });
          return;
        }

        if (data.session) {
          console.log('Auth callback successful:', data.session.user);
          // Redirect to the page they were trying to access, or home
          const redirectTo = sessionStorage.getItem('redirectAfterAuth') || '/';
          sessionStorage.removeItem('redirectAfterAuth');
          navigate(redirectTo, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen dotted-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h2 className="font-barriecito text-xl text-gray-900 mb-2">
          Completing Sign In...
        </h2>
        <p className="font-nunito text-gray-600">
          Please wait while we finish setting up your account.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;