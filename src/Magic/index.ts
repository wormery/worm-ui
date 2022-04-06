import WMagic from "./src";
import { useInstall } from "../utils/install";
import { magic } from "./src/directive";
useInstall(WMagic);

export { WMagic, magic };

export default WMagic;
