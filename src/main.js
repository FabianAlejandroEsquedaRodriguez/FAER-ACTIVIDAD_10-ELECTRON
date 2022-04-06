const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

//Para que la pantalla se refresque por nosotros (cambios en html y en código main.js)
// if (process.env.NODE_ENV !== 'production') {
//     require('electron-reload')(__dirname, {
//         electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
//     });
// }

//Guardar la ventana (De forma global)
let mainWindow;
let newProductWindow;

//Cuando la aplicacion este lista
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });//Crear la ventana

    //Cargar lo que dee mostrar en esa ventana
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),//Donde esta el archivo que debe cargar
        protocol: 'file', //En que protocolo lo va a cargar (aqui solo será un archivo)
        slashes: true
    }));

    //Para cambiar el menu de navegacion de la aplicacion
    const mainMenu = Menu.buildFromTemplate(templateMenu) //Regrasa un menu que vamos a diseñar (a partir de un arreglo que creamos)
    Menu.setApplicationMenu(mainMenu);

    //Escuchar el evento de cierre de la ventana principal (cerrar todas las ventanas al cerrar la principal)
    mainWindow.on('closed', () => {
        app.quit();
    });
});

function createNewProductWindow () {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a New Product',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    //Para que el menu no cargue en la nueva ventana
    newProductWindow.setMenu(null);

    //Cargar lo que dee mostrar en esa ventana
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/product.html'),//Donde esta el archivo que debe cargar
        protocol: 'file', //En que protocolo lo va a cargar (aqui solo será un archivo)
        slashes: true
    }));
    //Escuchar el evento de cierre de la ventana nueva
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}

//Ecuchar el evento desde el product.html (product:new) y recibe el evento y el producto
ipcMain.on('product:new', (e, newProduct) => {
    // console.log(newProduct);
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
});

const templateMenu = [//Arreglo de objetos
    {
        label: 'File', //Nombre del menu
        submenu: [
            {
                label: 'New Product', 
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                }
            },
            {
                label: "Remove All Products",
                click() {
                    mainWindow.webContents.send('products:remove-all');
                }
            },
            {
                label: "Exit",
                accelerator: process.platform == 'darwin' ? "command+q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    }
];

//Para comprobar el tipo de sistema operativo (darwin = Windows)
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}

//Si el proceso no está en producción
if(process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                //Abrir y cerrar las opciones de desarrollo
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}