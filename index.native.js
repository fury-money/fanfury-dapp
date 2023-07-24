import moment from "moment";
import * as React from "react";
import { AppRegistry } from "react-native";

import "node-libs-react-native/globals";
import "@react-native-anywhere/polyfill-base64";
import "react-native-gesture-handler";
import "text-encoding-polyfill";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import App from "./App";

console.warn = () => {};

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY",
  },
});

function Root() {
  return <App />;
}

AppRegistry.registerComponent("main", () => Root);
