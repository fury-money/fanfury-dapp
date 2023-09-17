// iOS Production build didn't  use index.native.js if index.js is set on package.json
// To Fix this issue we need to have root.js
import { Platform } from "react-native";

if (Platform.OS === "web") {
  require("./index");
} else {
  require("./index.native");
}