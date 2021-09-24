# DUX

# Librerias:
* Native base para componentes - Instalación: https://docs.nativebase.io/docs/GetStarted.html
* React navigation para navegación entre componentes - Instalacion: https://www.digitalocean.com/community/tutorials/react-react-native-navigation
* Nota: habría que usar un solo package manager (yarn o npm). Por lo que vi expo se maneja por defecto con yarn, yo usaría
  ese para todo.
  
# Instalación:
**Todos estos correrlos desde el respositorio/**
* Yarn
  `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
  `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
  `sudo apt update && sudo apt install yarn`

* Native base
  `yarn add native-base --save`
 
* Expo fonts (para fuentes, al parecer native base lo usa)
  `expo install expo-font`

* Reakit (componentes accesibles)  
  `yarn add reakit`

* React Navigation
  `yarn add @react-navigation/native`
  `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`
  EXTRA: Yo necesité este último también, por ahí no te pasa:
  `yarn add @react-navigation/stack`
  `yarn add @react-navigation/drawer`
  
  
* react-native-maps
  `yarn add react-native-maps`
 
* react-native-geojson
  `yarn add react-native-geojson`
 
* expo-image-picker
  `yarn add expo-image-picker`

# Build
Clonar repositorio:
```
git clone https://gitlab.com/Pesca1/dux

cd dux
```
Instalar localmente las dependencias para empaquetar:
```
yarn install
```
Levantar la página localmente
```
yarn start
```

