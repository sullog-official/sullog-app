import React from 'react';
import WebView from 'react-native-webview';

const App = () => {
  const uri = 'http://localhost:3000/';

  return <WebView source={{uri}} />;
};

export default App;
