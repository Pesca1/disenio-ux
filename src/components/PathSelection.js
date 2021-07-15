import React from 'react';
import Template from "./Template";
import {Map, TileLayer, Marker, GeoJSON, withLeaflet, Polygon, Popup} from "react-leaflet";
import axios from "axios";
import {Button} from "reakit";
import PrintControlDefault from 'react-leaflet-easyprint';
import L from 'leaflet';
import {RedIcon, BlueIconWithName, PolygonWithText} from './CustomIcon';

/* Open route service */
const URL = "https://api.openrouteservice.org/v2/directions/"
const API_KEY = "5b3ce3597851110001cf6248eba327ba0377440cac6ca3c8e26ecc63"
const PROFILE = "foot-walking"


const DESTINATIONS = [
    { lat: -34.930806, lon: -57.964902, name: 'Parque Vucetich' },
    { lat: -34.901461, lon: -57.980792, name: 'Opcion 2' },
    { lat: -34.862425, lon: -57.913978, name: 'Opcion 3' }
];

const latlngs = [[-34.918269,-57.960055], [-34.918691,-57.950092], [-34.924885,-57.948547], [-34.924322,-57.957135]]
const POLYGON = L.polygon(latlngs, {color:'red'}).toGeoJSON()

const COLORS = ["#d44141", "#41b7d4", "#6841d4"]

const PrintControl = withLeaflet(PrintControlDefault);

export default class PathSelection extends React.Component {
    constructor(props) {
        super(props);
        let bigFont = this.props.location && this.props.location.state && this.props.location.state.bigFont || false;
        this.state = {
            loading: true,
            routes: {},
            mouseOverPath: null,
            selectedPath:null ,
            print: false,
            bigFont
        }
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    componentDidMount() {
        if (!!this.props.location && !!this.props.location.state) {
            DESTINATIONS.forEach((dest, index) => {
                this.getRoute(this.props.location.state.lon, this.props.location.state.lat, dest.lon, dest.lat)
                    .then(response => {
                        //console.log("DISTANCIA CALCULADA: ", response)
                        let routes = {...this.state.routes};
                        routes[index] = response.data;
                        console.log(routes[index])
                        this.setState({routes});
                    }).catch(response => {
                    alert("No se puede calcular la distancia.")
                    console.log("ERROR AL CALCULAR DISTANCIA: ", response)
                })

            })
            
        }

        document.title = "Camino de evacuación - Prevención de inundaciones"
    }

    getRoute = (startLongitude, startLatitude, endLongitude, endLatitude) => {
        const options = JSON.stringify({avoid_polgons:POLYGON})
        const requestUrl = URL + PROFILE + "?api_key=" + API_KEY
            + "&start=" + startLongitude + "," + startLatitude
            + "&end=" + endLongitude + "," + endLatitude;
        //console.log("OPTIONS")
        //console.log(requestUrl)
        return axios.get(requestUrl, {
            params: {
                avoid_polygons: POLYGON 
            }
        })
    }

    getRoute = (startLongitude, startLatitude, endLongitude, endLatitude) => {
        const options = JSON.stringify({avoid_polgons:POLYGON})
        const requestUrl = URL + PROFILE + "?api_key=" + API_KEY
            + "&start=" + startLongitude + "," + startLatitude
            + "&end=" + endLongitude + "," + endLatitude;
        //console.log("OPTIONS")
        //console.log(requestUrl)
        return axios.get(requestUrl, {
            params: {
                avoid_polygons: POLYGON 
            }
        })
    }

    pointInMap = (event) => {
        if (this.state.mouseOverPath == null)
            this.setState({ selectedPath: null, print: false })
    }

    onEachFeature = (feature, layer, index) => {
        layer.on({
            mouseover: () => this.setState({ mouseOverPath: index }),
            mouseout: () => this.setState({ mouseOverPath: null }),
            click: (e) => this.setState({ selectedPath: index })
        })
    }

    getGeoJSONStyles = (key) => {
        return {
            weight: this.highlightKey(key)? 7 : 5,
            fillColor: COLORS[key],
            color: this.highlightKey(key) ? "#0b35fc" : "grey" //((!!this.state.selectedPath || !!this.state.mouseOverPath) ? "grey" : COLORS[key])
        }
    }

    highlightKey = (key) => (
        this.state.selectedPath === key
        || this.state.mouseOverPath === key
    )

    checkKey = (e) => {
        let [ lat, lon ] = this.state.center;
        let zoom = this.state.zoom;
        let multiplier = (zoom >= 15)? zoom : zoom/15;
        e = e || window.event;
        if (e.keyCode == '38') {
            // up arrow
            lat += 0.005/multiplier;
            e.preventDefault();
        }
        else if (e.keyCode == '40') {
            // down arrow
            lat -= 0.005/multiplier;
            e.preventDefault();
        }
        else if (e.keyCode == '37') {
            // left arrow
            lon -= 0.005/multiplier;
            e.preventDefault();
        }
        else if (e.keyCode == '39') {
            // right arrow
            lon += 0.005/multiplier;
            e.preventDefault();
        }
        else if (e.keyCode == '109') {
            // minus
            zoom -= 1;
            e.preventDefault();
        }
        else if (e.keyCode == '107') {
            // plus
            zoom += 1;
            e.preventDefault();
        }
        else if (e.keyCode == '13' && (this.state.addressSearchSkipped || this.state.addressNotFound)) {
            // enter
            this.setState({ selectedMarker: {lat, lon} })
            e.preventDefault();
        }
        this.setState({ center: [lat, lon], zoom })
    }

    print = () => {
        window.print();
        this.props.history.push('/thank-you', { bigFont: this.state.bigFont });
        window.location.reload()
    }

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            goBack={() => {this.props.history.push('/address-selection', { bigFont: this.state.bigFont }); window.location.reload()}}
            containerClass='map-container'>
            { !this.state.print ?
                <h1>Seleccioná tu camino de evacuación</h1>
                :
                <div>
                    <h1>Impresión de mapa</h1>
                    <h2>Lo que veas ahora en el mapa es lo que se va a imprimir. Asegurá que se vea claro el camino. Si no tenés impresora se guardará como pdf</h2>
                </div>
            }
            <div id='map-container'>
                <Map
                    center={[-34.911804, -57.954493]} zoom={13}
                    crollWheelZoom={true} onClick={this.pointInMap}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { Object.keys(this.state.routes).filter(key => !this.state.print || key === this.state.selectedPath).map(key =>
                        <GeoJSON
                        key={key}
                        data={this.state.routes[key]}
                        onEachFeature={(feature, layer) => this.onEachFeature(feature, layer, key)}
                        style={() => this.getGeoJSONStyles(key)}
                        />
                    )}
                        <Marker 
                            icon={RedIcon} 
                            position={[this.props.location.state.lat, this.props.location.state.lon]}
                        />
                    {
                        (this.state.selectedPath==null) ?
                            Object.keys(this.state.routes).map(key=>{
                                return(
                                    <Marker position={[DESTINATIONS[key].lat, DESTINATIONS[key].lon]} icon={BlueIconWithName(DESTINATIONS[key].name)}/>
                            )
                        })
                        : <Marker position={[DESTINATIONS[this.state.selectedPath].lat, DESTINATIONS[this.state.selectedPath].lon]} icon={BlueIconWithName(DESTINATIONS[this.state.selectedPath].name)}/>
                        
                    }
                    
                            
                </Map>
            </div>
            <br/>
            { Object.keys(this.state.routes).filter(key => !this.state.print ||  key === this.state.selectedPath).map(key =>
                <>
                <Button 
                    className={'button inline '+(this.state.selectedPath === key || this.state.mouseOverPath === key ? 'selected' : '')} 
                    onClick={() => this.setState({ selectedPath: key })}>
                        {DESTINATIONS[key].name}
                    </Button>
                </>
            ) }
            <br/>
            <br/>
            { !!this.state.selectedPath && !this.state.print &&
                <Button className='button' onClick={() => this.setState({ print: true })}>Seleccionar camino</Button>
            }
            { !!this.state.selectedPath && this.state.print &&
            <>
                <Button className='button' onClick={() => this.setState({ print: false })}>Ver de vuelta los caminos</Button>
                <Button className='button' onClick={this.print}>Imprimir y finalizar</Button>
            </>
            }
        </Template>
    )
}