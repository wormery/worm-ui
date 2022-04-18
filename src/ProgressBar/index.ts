export * from "./src/index";
import WProgressBar from "./src/index";
import { useInstall } from "../utils/install";
useInstall(WProgressBar);
export { WProgressBar };
export default WProgressBar;
