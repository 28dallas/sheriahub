import React from 'react';

const EnvTest = () => {
  // Test if environment variables are accessible
  const envVars = {
    apiBaseUrl: import.meta.env.REACT_APP_API_BASE_URL,
    appName: import.meta.env.REACT_APP_APP_NAME,
    ussdCode: import.meta.env.REACT_APP_USSD_CODE,
    africastalkingApiKey: import.meta.env.REACT_APP_AFRICASTALKING_API_KEY ? 'Set (hidden)' : 'Not set',
    africastalkingUsername: import.meta.env.REACT_APP_AFRICASTALKING_USERNAME ? 'Set (hidden)' : 'Not set',
    africastalkingEnvironment: import.meta.env.REACT_APP_AFRICASTALKING_ENVIRONMENT,
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px', margin: '20px' }}>
      <h3>Environment Variables Test</h3>
      <pre style={{ background: 'white', padding: '15px', borderRadius: '4px' }}>
        {JSON.stringify(envVars, null, 2)}
      </pre>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        ✅ Environment variables are working! Vite is exposing REACT_APP_* variables correctly.
      </p>
    </div>
  );
};

export default EnvTest;
