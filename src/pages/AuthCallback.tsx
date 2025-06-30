import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback page loaded');
        
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          
          // Redirect to home after showing error
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
          return;
        }

        if (data.session) {
          console.log('Auth callback successful for user:', data.session.user.email);
          setStatus('success');
          setMessage('Successfully signed in! Redirecting...');
          
          // Redirect to the page they were trying to access, or home
          const redirectTo = sessionStorage.getItem('redirectAfterAuth') || '/';
          sessionStorage.removeItem('redirectAfterAuth');
          
          setTimeout(() => {
            navigate(redirectTo, { replace: true });
          }, 2000);
        } else {
          console.log('No session found in auth callback');
          setStatus('error');
          setMessage('No authentication session found.');
          
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        setStatus('error');
        setMessage('An unexpected error occurred.');
        
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-8 w-8 mx-auto mb-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen dotted-background flex items-center justify-center">
      <div className="text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-4">
        {getIcon()}
        
        <h2 className="font-barriecito text-xl text-gray-900 mb-2">
          {status === 'loading' && 'Completing Sign In...'}
          {status === 'success' && 'Welcome Back!'}
          {status === 'error' && 'Sign In Failed'}
        </h2>
        
        <p className={`font-nunito ${getStatusColor()}`}>
          {message}
        </p>
        
        {status === 'error' && (
          <button
            onClick={() => navigate('/', { replace: true })}
            className="mt-4 font-barriecito bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;