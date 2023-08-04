import React, {createRef} from 'react';
import WebView from 'react-native-webview';

const App = () => {
  const uri = 'https://sullog-client.vercel.app/';

  let webViewRef = createRef<WebView>();

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const onMessage = (payload: {nativeEvent: {data: string}}) => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {}

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        console.log(dataPayload);
      }
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{
        uri,
      }}
      injectedJavaScript={debugging}
      onMessage={onMessage}
      thirdPartyCookiesEnabled
      sharedCookiesEnabled
    />
  );
};

export default App;
