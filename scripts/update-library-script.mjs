import { exec } from "child_process";
import fs from "fs";
import chokidar from "chokidar";

console.log(`update-library-script.ts:${/*LL*/ 5}`, {});

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
  console.log(`update-library-script.mjs:${/*LL*/ 24}`, {});

  setTimeout(() => {
    console.log(`update-library-script.mjs:${/*LL*/ 27}`, {});
    const contentsResp = safeGetFileContents(sigFilePath);
    if (!contentsResp.success)
      return console.log(`update-library-script.mjs:${/*LL*/ 30}`, "could not get file contents");

    const currentSigValue = contentsResp.contents;
    console.log(currentSigValue, sigValue, currentSigValue === sigValue);

    if (sigValue === currentSigValue) return console.log("update not required");
    sigValue = currentSigValue;
    console.log("update required");

    try {
      exec("npm run add-library", (error, stdout, stderr) => {
        if (error) {
          console.log(`update-library-script.mjs:${/*LL*/ 54}`, error);
          return;
        }

        console.log(`update-library-script.mjs:${/*LL*/ 58}`, stdout);
        console.log(`update-library-script.mjs:${/*LL*/ 59}`, stderr);
      });
    } catch (error) {
      console.log(`update-library-script.mjs:${/*LL*/ 62}`, "not gooood");
    }
  }, 1000);
};

const handleChangeOrAdd2 = () => {
  console.log(`update-library-script.mjs:${/*LL*/ 39}`, sigFilePath);

  const contentsResp = safeGetFileContents(".yalc/pokkit-auth-component-library/yalc.sig");
  if (!contentsResp.success)
    return console.log(`update-library-script.mjs:${/*LL*/ 43}`, "could not get file contents");

  const currentSigValue = contentsResp.contents;
  console.log(currentSigValue, sigValue, currentSigValue === sigValue);

  if (sigValue === currentSigValue) return;
  sigValue = currentSigValue;

  try {
    exec("npm run update-library", (error, stdout, stderr) => {
      if (error) {
        console.log(`update-library-script.mjs:${/*LL*/ 54}`, error);
        return;
      }

      console.log(`update-library-script.mjs:${/*LL*/ 58}`, stdout);
      console.log(`update-library-script.mjs:${/*LL*/ 59}`, stderr);
    });
  } catch (error) {
    console.log(`update-library-script.mjs:${/*LL*/ 62}`, "not gooood");
  }
};

watcher.on("change", handleChangeOrAdd);
watcher.on("add", handleChangeOrAdd);
