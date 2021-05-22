import React from 'react';
import Template from "./Template";
import {Map, TileLayer, Marker, GeoJSON, withLeaflet} from "react-leaflet";
import axios from "axios";
import {Button} from "reakit";
import PrintControlDefault from 'react-leaflet-easyprint';

/* Open route service */
const URL = "https://api.openrouteservice.org/v2/directions/"
const API_KEY = "5b3ce3597851110001cf6248eba327ba0377440cac6ca3c8e26ecc63"
const PROFILE = "driving-car"

const DESTINATIONS = [
    { lat: -34.930806, lon: -57.964902, name: 'Parque Vucetich' },
    { lat: -34.901461, lon: -57.980792, name: 'Opcion 2' },
    { lat: -34.862425, lon: -57.913978, name: 'Opcion 3' }
];

const COLORS = ["#d44141", "#41b7d4", "#6841d4"]

const PrintControl = withLeaflet(PrintControlDefault);

export default class PathSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            routes: {},
            mouseOverPath: null,
            selectedPath: null,
            print: false
        }
    }

    componentDidMount() {
        if (!!this.props.location && !!this.props.location.state) {
            DESTINATIONS.forEach((dest, index) => {
                this.getRoute(this.props.location.state.lon, this.props.location.state.lat, dest.lon, dest.lat)
                    .then(response => {
                        console.log("DISTANCIA CALCULADA: ", response)
                        let routes = {...this.state.routes};
                        routes[index] = response.data;
                        this.setState({routes});
                    }).catch(response => {
                    alert("No se puede calcular la distancia.")
                    console.log("ERROR AL CALCULAR DISTANCIA: ", response)
                })
            })
        }
    }

    getRoute = (startLongitude, startLatitude, endLongitude, endLatitude) => {
        const requestUrl = URL + PROFILE + "?api_key=" + API_KEY
            + "&start=" + startLongitude + "," + startLatitude
            + "&end=" + endLongitude + "," + endLatitude;
        return axios.get(requestUrl)
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
            color: this.highlightKey(key)? "#2f52ff" : COLORS[key]
        }
    }

    highlightKey = (key) => (
        this.state.selectedPath === key
        || this.state.mouseOverPath === key
    )

    render = () => (
        <Template
            goBack={() => this.props.history.push('/address-selection')}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            containerClass='map-container'>
            { !this.state.print ?
                <h3>Seleccioná tu camino de evacuación</h3>
                :
                <h3>Visualizá la parte del camino que querés imprimir</h3>
            }
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
                { this.state.print &&
                    <PrintControl position="topleft" sizeModes={['Current']} hideControlContainer={false}/>
                }
            </Map>
            <br/>
            { Object.keys(this.state.routes).filter(key => !this.state.print || key === this.state.selectedPath).map(key =>
                <>
                <Button className='button inline' onClick={() => this.setState({ selectedPath: key })}>{DESTINATIONS[key].name}</Button>
                </>
            ) }
            <br/>
            <br/>
            { !!this.state.selectedPath && !this.state.print &&
                <Button className='button' onClick={() => this.setState({ print: true })}>Imprimir camino</Button>
            }
            { !!this.state.selectedPath && this.state.print &&
                <Button className='button' onClick={() => this.setState({ print: false })}>Ver todos los caminos</Button>
            }
        </Template>
    )
}