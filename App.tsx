import React from 'react';
import WebView from 'react-native-webview';

const App = () => {
  const uri = 'https://sullog-client.vercel.app/';

  return <WebView source={{uri}} />;
};

export default App;
