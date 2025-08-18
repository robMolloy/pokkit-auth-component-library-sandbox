import { exec } from "child_process";
import fs from "fs";
import chokidar from "chokidar";

const safeGetFileContents = (filePath) => {
  try {
    const contents = fs.readFileSync(filePath, "utf8");
    return { success: true, contents };
  } catch (error) {
    return { success: false, error };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sigValue = "";

const sigFilePath = ".yalc/pokkit-auth-component-library/yalc.sig";
const watchFilePath = "yalc.lock";
const watcher = chokidar.watch(watchFilePath);

const handleChangeOrAdd = () => {
  const contentsResp = safeGetFileContents(sigFilePath);
  if (!contentsResp.success)
    return console.log(`update-library-script.mjs:${/*LL*/ 30}`, "could not get file contents");

  const currentSigValue = contentsResp.contents;

  if (sigValue === currentSigValue) return console.log("update not required");
  console.log("update required");

  sigValue = currentSigValue;
  try {
    exec("npm run add-library", (error, stdout, stderr) => {
      if (error) {
        console.log(`update-library-script.mjs:${/*LL*/ 54}`, error);
        return;
      }
      if (stdout) console.log(`update-library-script.mjs:${/*LL*/ 58}`, stdout);
      if (stderr) console.log(`update-library-script.mjs:${/*LL*/ 59}`, stderr);
    });
  } catch (error) {
    console.log(`update-library-script.mjs:${/*LL*/ 62}`, "not gooood", error);
  }
};

watcher.on("change", handleChangeOrAdd);
watcher.on("add", handleChangeOrAdd);
