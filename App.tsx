import React, {createRef} from 'react';
import {NativeSyntheticEvent} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {WebViewMessage} from 'react-native-webview/lib/WebViewTypes';

const App = () => {
  const uri = 'http://localhost:3000/login';

  // Send the cookie information back to the mobile app
  const CHECK_COOKIE: string = `
    ReactNativeWebView.postMessage("Cookie: " + document.cookie);
    true;
  `;

  const onNavigationStateChange = (navigationState: WebViewNavigation) => {
    console.log(
      '🚀 ~ file: App.tsx:16 ~ onNavigationStateChange ~ navigationState:',
      navigationState,
    );
    // Check cookies every time URL changes
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(CHECK_COOKIE);
    }
  };

  const onMessage = (event: NativeSyntheticEvent<WebViewMessage>) => {
    const {data} = event.nativeEvent;

    if (data.includes('Cookie:')) {
      // process the cookies
    }
  };

  let webViewRef = createRef<WebView>();

  return (
    <WebView
      ref={webViewRef}
      source={{uri}}
      onNavigationStateChange={onNavigationStateChange}
      onMessage={onMessage}
      thirdPartyCookiesEnabled
      sharedCookiesEnabled
    />
  );
};

export default App;
