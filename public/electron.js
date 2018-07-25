const electron = require("electron");
const url = require("url");
const path = require("path");
const log = require("electron-log");
const fs = require("fs");
const { app, BrowserWindow, ipcMain } = electron;
const simpleGit = require("simple-git");
const shell = require("node-powershell");
const isDev = require("electron-is-dev");

const solutionParser = require("../src/native/SolutionParser");

const Datastore = require("nedb"),
  db = new Datastore({
    filename: `${path.dirname(__dirname)}\\assets\\datastore\\settings.store`,
    autoload: true
  });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function initializeApp() {
  log.transports.file.level = "info";
  // Create the browser window.
  win = new BrowserWindow({
    minwidth: 950,
    width: 1300,
    minheight: 600,
    height: 850,
    show: false
  });
  // and load the index.html of the app.
  //win.loadFile("public/index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  log.info(
    `Loading application primary index.html from: file://${path.join(
      __dirname,
      "../build/index.html"
    )}`
  );

  // create a new `splash`-Window
  splash = new BrowserWindow({
    minwidth: 950,
    width: 1300,
    minheight: 600,
    height: 850,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadURL(
    isDev
      ? "http://localhost:3000/splash.html"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // if main window is ready to show, then destroy the splash window and show up the main window
  win.once("ready-to-show", () => {
    splash.destroy();
    win.show();
  });

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    app.quit();
  });
}

ipcMain.on("versionControl:requestEntityData", function(e, folderPath) {
  console.log(folderPath);
  solutionParser.parseEntityData(log, win, folderPath);
});

/**
 * Commit to git repository. Initializes if this is the first commit.
 * To-Do: Have user init repo, then allow commit?
 */
ipcMain.on("git:commit", function(e, summary, description, repoPath) {
  console.log(
    `Summary: ${summary} \nDescription: ${description} \nRepo Path: ${repoPath}`
  );
  simpleGit(repoPath).diffSummary(function(err, status) {
    console.log(status.files[0]);
  });

  /*
  simpleGit()
    .cwd(repoPath)
    .add("./*")
    .commit(`summary: ${summary}, desc: ${description}`, () => {
      log.info(`Changes commited to repo: ${repoPath}`);
    });
    */
});

ipcMain.on("git:init", function(e, repoPath) {
  const gitP = require("simple-git/promise");
  const git = gitP(repoPath);
  git
    .checkIsRepo()
    .then(isRepo => !isRepo && initialiseRepo(git))
    .then(() => log.info(`Initialized repo for directory ${repoPath}`));
});

/**
 * Initialize git repository
 * @param {simpleGit} git
 */
function initialiseRepo(git) {
  return git.init().then(() => {});
}
//setDefaultSettings();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", initializeApp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    initializeApp();
  }
});

/*
  Set Default Settings
*/
/*
function setDefaultSettings() {
  let settings = {
    _id: "id1",
    restEndpoint: "https://contoso.api.crm.dynamics.com/api/data/v9.0/",
    repoPath: `${app.getAppPath()}\\output\\ExtractedSolution`
  };

  db.insert(settings, function(err, newSettings) {
    if (err) console.log(`ERROR ${err}`);
  });
}
*/

/*
  Retrieve Settings
*/
ipcMain.on("packagerPresets:retrieve", function(e) {
  db.find({ presetName: { $exists: true } }, function(err, presets) {
    win.webContents.send("packagerPresets:acquired", presets);
  });
});

/*
  Update Settings

  Preset:
  {
    _id: string,
    presetName: string,
    action: string, // {"extract"|"pack"}
    zipFile: string, // <file path>
    zipFilePath: string,
    folder: string, // <folder path>
    packageType: string, // {"unmanaged"|"managed"|"both"}
    allowWrite: string, // {"yes"|"no"}
    allowDelete: string, // {"yes"|"no"|"prompt"}
    clobber: string,
    errorLevel: string, // {"yes"|"no"|"prompt"}
    map: string, // <file path>
    nologo: string,
    log: string, // <file path>
    sourceLoc: string, // <string>
    localize: string
  }
*/
ipcMain.on("packagerPresets:update", function(e, preset) {
  db.update(
    {
      presetName: `${preset.presetName}`
    },
    {
      $set: { ...preset }
    },
    {},
    function(err, numReplaced) {
      // Update callbackcode here
      // db.find({ presetName: { $exists: true } }, function(
      //   err,
      //   presets
      // ) {
      //   win.webContents.send("packagerPresets:acquired", presets);
      // });
    }
  );
});

ipcMain.on("packagerPresets:insert", function(e, preset) {
  db.insert({ ...preset }, function(err, newDoc) {});
});

/*
ipcMain.on("settings:update", function(e, settings) {
  let currentSettings = null;
  let newSettings = settings;
  db.findOne({ _id: "id1" }, { restEndpoint: 1, repoPath: 1 }, function(
    err,
    settings
  ) {
    currentSettings = settings;

    // If setting has changed update
    let restEndpoint = null;
    if (
      currentSettings.restEndpoint === newSettings.restEndpoint ||
      newSettings.restEndpoint === undefined
    ) {
      restEndpoint = currentSettings.restEndpoint;
    } else {
      restEndpoint = newSettings.restEndpoint;
    }

    // If setting has changed update
    let repoPath = null;
    if (
      currentSettings.repoPath === newSettings.repoPath ||
      newSettings.repoPath === undefined
    ) {
      repoPath = currentSettings.repoPath;
    } else {
      repoPath = newSettings.repoPath;
    }

    // Update settings
    db.update(
      {
        _id: "id1"
      },
      {
        $set: {
          repoPath: repoPath,
          restEndpoint: restEndpoint
        }
      },
      { multi: true },
      function(err, numReplaced) {
        // Update callbackcode here
      }
    );
  });
});
*/

ipcMain.on("packager:retrieveDefaultExtract", function(e) {
  win.webContents.send("packager:defaultExtract", {
    packagerSettings: {
      presetName: "Default",
      action: "extract", // {Extract|Pack}
      zipFile: "", // <file path>
      zipFilePath: `${app.getPath(
        "documents"
      )}\\${app.getName()}\\solutions\\PackedSolution`,
      folder: `${app.getPath(
        "documents"
      )}\\${app.getName()}\\solutions\\ExtractedSolution`, // <folder path>
      packageType: "", // {Unmanaged|Managed|Both}
      allowWrite: "", // {Yes|No}
      allowDelete: "", // {Yes|No|Prompt}
      clobber: "",
      errorLevel: "", // {Yes|No|Prompt}
      map: "", // <file path>
      nologo: "",
      log: "", // <file path>
      sourceLoc: "", // <string>
      localize: ""
    }
  });
});

// Catch solution:unpack
ipcMain.on("packager", function(e, packagerSettings) {
  let ps = new shell({
    executionPolicy: "Bypass",
    noProfile: true
  });

  log.info(`Dynamics 365 solution to unpack: ${packagerSettings.zipFile}`);

  let cmd = buildPackagerCommand(packagerSettings);
  console.log(cmd);

  ps.addCommand(cmd);
  log.info(`Running PowerShell Command: ${cmd}`);
  ps.invoke()
    .then(output => {
      log.info(`\n${output}`);
      win.webContents.send("packager:output", "success", output);
      ps.dispose();
    })
    .catch(err => {
      log.error(err.replace(/(\[39m|\[31m)/g, ""));
      win.webContents.send("packager:output", "error", err);
      ps.dispose();
    });

  // Called on dispose
  ps.on("end", code => {
    console.log("Command complete");
  });
});

function buildPackagerCommand(packagerSettings) {
  let cmd = "";

  let solutoinPackagerPath = null;
  if (isDev) {
    solutoinPackagerPath = `& '${app.getAppPath()}\\assets\\powershell\\SolutionPackager.exe' `;
  } else {
    solutoinPackagerPath = `& '${
      process.resourcesPath
    }\\powershell\\SolutionPackager.exe' `;
  }
  let parameters = "";
  let param = "";

  // If we are packing the solution combine zipFilePath and zipFile for command line arg
  // Electron throws error when trying to use
  if (packagerSettings.action === "pack") {
    let zipFile = `${packagerSettings.zipFilePath}\\${
      packagerSettings.zipFile
    }`;
    packagerSettings.zipFile = zipFile;

    delete packagerSettings.zipFilePath;

    // Add file extension if it's missing.
    if (getFileExtension(packagerSettings.zipFile) === "") {
      packagerSettings.zipFile += ".zip";
    }
  } else {
    delete packagerSettings.zipFilePath;
  }

  for (var key in packagerSettings) {
    if (
      packagerSettings[key] !== "" &&
      packagerSettings[key] !== undefined &&
      !parameters.includes(key)
    ) {
      switch (key) {
        case "presetName":
        case "newPresetName":
          break;
        case "clobber":
        case "localize":
          param = `${packagerSettings[key]} `;
          break;
        case "folder":
        case "zipFile":
          // Quotes to handle paths with spaces
          param = `/${key} '${packagerSettings[key]}' `;
          break;
        default:
          param = `/${key} ${packagerSettings[key]} `;
          console.log(param);
      }
      parameters += param;
    }
  }

  cmd = `${solutoinPackagerPath} ${parameters}`;

  return cmd;
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
