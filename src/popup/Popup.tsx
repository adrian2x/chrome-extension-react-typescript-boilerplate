import * as browser from "webextension-polyfill";
import * as React from "react";
import "./Popup.scss";

interface AppProps {}

interface AppState {}

export default class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
  }

  emit = message => {
    browser.runtime.sendMessage({ module: "popup", ...message });
  };

  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    this.emit({ popupMounted: true });
  }

  render() {
    return (
      <div className="popupContainer">
        <p>Please register to use this extension</p>
        <button onClick={this.onRegister}>Register here</button>
      </div>
    );
  }

  onRegister = () => {
    // Sends a message to the background page
    this.emit({ registered: true });
  };
}
