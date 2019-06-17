
const path = require('path');
const electron = require('electron');
const spawn = require('child_process').spawn;
const {app, BrowserWindow, protocol, Tray, Menu, ipcMain, globalShortcut} = electron;

const APP_WIDTH = 50;
const APP_HEIGHT = 50;

// Annoying warnings :S
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

// prevent window being garbage collected
let mainWindow = null;
let shouldTopMost = true;
let isDev = false;

function createMainWindow(){
    let {
        width,
        height
    } = electron.screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: APP_WIDTH,
        height: APP_HEIGHT,
        frame: false,
        resizable: true,
        transparent: true,
        title: 'Audbox',
        titleBarStyle: 'hiddenInset',
        x: (width - 320),
        y: (height - 380),
        show: false,
        contextIsolation: true,
        skipTaskbar: true,
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true,
            experimentalFeatures: true
        }
    });

    mainWindow.setMinimumSize(APP_WIDTH, APP_HEIGHT);
    mainWindow.setMaximumSize(APP_WIDTH, APP_HEIGHT);

    mainWindow.setMaximizable(false);
    mainWindow.setMinimizable(false);
    mainWindow.setFullScreenable(false);

    mainWindow.on('closed', () => {
        mainWindow = null; // Cleanup
    });
    
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
    });

    mainWindow.webContents.on('crashed', function(event){
        console.log( '== Crashed ==');
        console.log( event );
    });
    
    // Setup hot reload
    let args = process.argv.slice(1);
    isDev = args.some(val => val === '--dev');

    shouldTopMost = true;
    
    if (isDev) {
        mainWindow.loadURL('file://' + path.join(__dirname, 'www/index.html'));
        mainWindow.webContents.openDevTools({mode: 'detach'});
    } else {
        mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
    }

    mainWindow.setAlwaysOnTop(true);
    setInterval(() => {
        mainWindow.setAlwaysOnTop(shouldTopMost);
    }, 1500);
};

function setupTray() {
    /*let iconPath = path.join(__dirname, 'www/assets/rawr_icon.ico');

    if (!isDev)
        iconPath = path.join(__dirname, 'assets/rawr_icon.ico');
    
    appIcon = new Tray(iconPath);
    appIcon.setToolTip('Rawr .: Music Player :.');
    appIcon.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Rawr .: Version ' + app.getVersion() + ' :.'
        },
        {
            type: 'separator'
        },
        {
            label: 'Pin program and top most',
            type: 'checkbox',
            checked: shouldTopMost,
            click: function(){
                if (mainWindow == null) return;

                shouldTopMost = !shouldTopMost;
                mainWindow.setAlwaysOnTop(shouldTopMost);
            }
        },
        {
            label: 'Exit',
            type: 'normal',
            click: function(){
                mainWindow.webContents.send('request-shutdown');
            }
        }
    ]));*/
}

function init() {
    app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required'); // Allow autoplay
    if (!makeSingleInstance()) return app.quit();

    app.on('ready', () => {
        createMainWindow();
        setupTray();
    });

    app.on('window-all-closed', function () {
        app.quit()
    });

    app.on('quit', function(){
        app.releaseSingleInstanceLock();
    });

    app.on('activate', function () {
        if (mainWindow != null) return;
        createMainWindow();
    });
}

// =================
// CHECK IF ITS SINGLE
//==================
function makeSingleInstance() {
    return app.requestSingleInstanceLock();
}

init();