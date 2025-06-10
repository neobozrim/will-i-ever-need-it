import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const TestSupabase = () => {
  const [message, setMessage] = useState('Testing Supabase connection...');
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<Array<{step: string; status: string; message?: string}>>([]);

  const addDetail = (step: string, status: 'success' | 'error', message?: string) => {
    setDetails(prev => [...prev, { step, status, message }]);
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Check if Supabase URL and key are set
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase environment variables');
        }
        addDetail('Environment variables', 'success');

        // Test 2: Test authentication
        const { data: authData, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          addDetail('Authentication', 'error', authError.message);
          throw authError;
        }
        addDetail('Authentication', 'success', 'Session retrieved');
        
        // Test 3: Test database access - using the correct table name 'math_concepts'
        const { data: dbData, error: dbError, count } = await supabase
          .from('math_concepts')
          .select('*', { count: 'exact' })
          .limit(1);
          
        if (dbError) {
          addDetail('Database Access', 'error', dbError.message);
          throw dbError;
        }
        
        addDetail('Database Access', 'success', `Found ${count} records in math_concepts`);
        
        setMessage('✅ Successfully connected to Supabase!');
        console.log('Supabase session:', authData);
        console.log('Sample data:', dbData);
      } catch (err) {
        console.error('Supabase test error:', err);
        const errorMessage = err instanceof Error ? `${err.message} (${err.name})` : 'Unknown error occurred';
        setError(errorMessage);
        setMessage('❌ Failed to connect to Supabase');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supabase Connection Test</h2>
        <div className={`text-lg font-medium mb-4 ${
          error ? 'text-red-600' : message.includes('✅') ? 'text-green-600' : 'text-gray-700'
        }`}>
          {message}
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-900">Test Results:</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {details.length === 0 ? (
              <p className="text-sm text-gray-500">Running tests...</p>
            ) : (
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full mr-2 flex-shrink-0 ${
                      detail.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {detail.status === 'success' ? (
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L4 8.56l-2.28-2.28a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L4.94 6l-1.72 1.72a.75.75 0 101.06 1.06L6 7.06l1.72 1.72a.75.75 0 101.06-1.06L7.06 6l1.72-1.72a.75.75 0 00-1.06-1.06L6 4.94 4.28 3.22z" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{detail.step}: </span>
                      <span className="text-sm text-gray-600">{detail.message || detail.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
            <li>Check if your Supabase project is running and accessible</li>
            <li>Verify your environment variables are correct in the .env file</li>
            <li>Make sure your Supabase RLS (Row Level Security) policies allow access</li>
            <li>Check the browser's developer console for detailed error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestSupabase;
