const electron = require("electron");
const url = require("url");
const path = require("path");
const log = require("electron-log");
const fs = require("fs");

const { app, BrowserWindow, ipcMain } = electron;

const shell = require("node-powershell");

const Datastore = require("nedb"),
  db = new Datastore({
    filename: `${path.dirname(__dirname)}\\assets\\datastore\\settings.store`,
    autoload: true
  });

let ps = new shell({
  executionPolicy: "Bypass",
  noProfile: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function initializeApp() {
  // Create the browser window.
  win = new BrowserWindow({ width: 950, height: 600 });

  // and load the index.html of the app.
  //win.loadFile("public/index.html");
  win.loadURL("http://localhost:3000");

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

setDefaultSettings();

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
function setDefaultSettings() {
  let settings = {
    _id: "id1",
    restEndpoint: "https://contoso.api.crm.dynamics.com/api/data/v9.0/",
    repoPath: `${path.dirname(__dirname)}\\assets\\solutionOutput`
  };

  db.insert(settings, function(err, newSettings) {
    if (err) console.log(`ERROR ${err}`);
  });
}

/*
  Retrieve Settings
*/
ipcMain.on("settings:retrieve", function(e) {
  db.findOne({ _id: "id1" }, { restEndpoint: 1, repoPath: 1 }, function(
    err,
    settings
  ) {
    win.webContents.send("settings:update", settings);
  });
});

// TO-DO this is a bit complex. Simplify!
// This will not be a great solution for a case with many settings
/*
  Update Settings
*/
ipcMain.on("settings:update", function(e, settings) {
  db.update(
    {
      _id: "id1"
    },
    {
      $set: {
        repoPath: settings.repoPath,
        restEndpoint: settings.restEndpoint
      }
    },
    { multi: true },
    function(err, numReplaced) {
      // Update callbackcode here
    }
  );
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
      action: "extract", // {Extract|Pack}
      zipFile: "", // <file path>
      folder: `${app.getAppPath()}\\assets\\solutionOutput`, // <folder path>
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
ipcMain.on("packager", function(e, packagersettings) {
  log.info(`Dynamics 365 solution to unpack: ${packagersettings.zipFile}`);

  let cmd = buildPackagerCommand(packagersettings);
  console.log(cmd);

  ps.addCommand(cmd);
  log.info(`Running PowerShell Command: ${cmd}`);
  ps.invoke()
    .then(output => {
      log.info(`\n${output}`);
      win.webContents.send("packager:output", output);
      ps.dispose();
    })
    .catch(err => {
      log.error(err);
      win.webContents.send("packager:output", err);
      ps.dispose();
    });

  // Called on dispose
  ps.on("end", code => {
    console.log("Command complete");
  });
});

function buildPackagerCommand(packagersettings) {
  let cmd = "";
  let solutoinPackagerPath = `${path.dirname(
    __dirname
  )}\\assets\\powershell\\SolutionPackager.exe `;

  let parameters = "";
  let param = "";

  for (var key in packagersettings) {
    if (packagersettings[key] !== "" && packagersettings[key] !== undefined) {
      switch (key) {
        case "clobber":
        case "localize":
          param = `${packagersettings[key]} `;
          break;
        default:
          param = `/${key} ${packagersettings[key]} `;
          console.log(param);
      }
      parameters += param;
    }
  }

  cmd = solutoinPackagerPath + parameters;

  return cmd;
}
