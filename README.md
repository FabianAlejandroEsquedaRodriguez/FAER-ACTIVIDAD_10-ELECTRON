# FAER-ACTIVIDAD_10-ELECTRON
Actividad de la clase de programación para internet (Sección D03)

El archivo ejecutable de la aplicación se ecuentra dentro de la carpeta "release_builds" y "my-app-win32-ia32".
Carpetas y archivos que se genera al momento de poner el comando "npm run package-win" en la linea de comandos.

![image](https://user-images.githubusercontent.com/70966003/161885076-3273f544-cef0-4def-b68c-7f862179bf28.png)

El archivo "package.json" debería lucir algo así:
![image](https://user-images.githubusercontent.com/70966003/161884891-64643b6a-6bdb-42ed-8cef-70c499eb1358.png)

Las líneas de código dentro del "scripts" son las siguientes, modificando "my-app" y ProductName por los nuestros:

"package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
"package-win": "electron-packager . my-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron App\"",    
"package-linux": "electron-packager . my-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"

La aplicación corriendo se ve algo así:
![image](https://user-images.githubusercontent.com/70966003/161885296-eae08205-2a0a-4868-b765-56a9c4f87a1e.png)

![image](https://user-images.githubusercontent.com/70966003/161885380-2f798df0-518e-400d-b2f4-fb04053911a2.png)
