import React from 'react';
import Template from "./Template";
import {Map, TileLayer, Marker, GeoJSON, withLeaflet, Polygon, Popup} from "react-leaflet";
import axios from "axios";
import {Button} from "reakit";
import PrintControlDefault from 'react-leaflet-easyprint';
import L from 'leaflet';
import {RedIcon, BlueIcon, PolygonWithText, IconHouse, NodeIcon} from './CustomIcon';
import {decodePolyline, getDirectionsFromResponse, translateDirection} from "../utils";
import {multipolygons} from "../constants"

/* Open route service */
const URL = "https://api.openrouteservice.org/v2/directions/"
const API_KEY = "5b3ce3597851110001cf6248eba327ba0377440cac6ca3c8e26ecc63"
const PROFILE = "foot-walking"



const DESTINATIONS = [
     
    { lat: -34.91409909106378, lon: -57.94983868465823, name: 'Pasaje Dardo Rocha' },
    { lat: -34.9161731914128, lon: -57.987197189264975, name: 'Estadio único' },
    { lat: -34.939472246440424, lon: -57.93923180754026, name: 'Meridiano V' },
    //{ lat: -34.90384739409903, lon: -57.94775250865569, name: 'Hipódromo' }
];

const latlngs = [[-34.898167, -57.966339], [-34.911007, -57.961710], [-34.924228, -57.958756], [-34.933330, -57.953126],
    [-34.946957, -57.949897], [-34.948637, -57.947721], [-34.949158, -57.958361], [-34.941221, -57.957698], [-34.939513, -57.957903],
    [-34.936037, -57.960122], [-34.943283, -57.966192], [-34.941551, -57.968379], [-34.931148, -57.966453], [-34.937087, -57.974469],
    [-34.932746, -57.973666], [-34.932718, -57.973651], [-34.926169, -57.966523], [-34.913037, -57.970329], [-34.911490, -57.974724],
    [-34.913453, -57.978931], [-34.925203, -57.981481], [-34.929650, -57.980080], [-34.932301, -57.981089], [-34.925913, -57.990550],
    [-34.922713, -57.987010], [-34.916180, -57.986458]];

    
    const COLORS = ["#d44141", "#41b7d4", "#6841d4"]
    
    const CENTER = [-34.911804, -57.954493];
    const ZOOM = 13;
    /*
    const multipolygons= [
        [
            [-34.921126527452685, -57.981719970703125],
            [-34.921056151334476, -57.9814624786377],
            [-34.916059292689354, -57.98086166381837]
        ],
        
        [
            [-34.92865642338382, -57.9880714416504],
            [-34.92612307758587, -57.98480987548829],
            [-34.929500854600626, -57.9800033569336],
            [-34.93104895592451, -57.982921600341804]
        ],
        
        [
            [-34.937029982009804, -57.95880317687989],
            [-34.93372288031159, -57.95579910278321],
            [-34.95103091375892, -57.95373916625977],
            [-34.94716154856814, -57.96146392822266]
        ],
        
        [
            [-34.91739651002616, -57.96172142028809],
            [-34.92795272406395, -57.959425449371345],
            [-34.930151764398296, -57.956678867340095],
            [-34.932702577342354, -57.959543466568],
            [-34.93294885853134, -57.9545545578003],
            [-34.9369596195322, -57.959403991699226],
            [-34.93323032184192, -57.961206436157234],
            [-34.932526661754665, -57.969660758972175],
            [-34.92608789167682, -57.965927124023445],
            [-34.92608789167682, -57.965927124023445]
        ]
    ];
*/
latlngs.forEach(latlng => latlng.reverse())
const POLYGON = L.polygon(latlngs, {color:'red'}).toGeoJSON()

const PrintControl = withLeaflet(PrintControlDefault);

export default class PathSelection extends React.Component {
    constructor(props) {
        super(props);
        let bigFont = this.props.location && this.props.location.state && this.props.location.state.bigFont || false;
        this.state = {
            loading: true,
            routes: {},
            directions: {},
            mouseOverPath: null,
            selectedPath:null ,
            print: false,
            center: CENTER,
            zoom: ZOOM,
            bigFont
        }
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    componentDidMount() {
        if (!!this.props.location && !!this.props.location.state) {
            DESTINATIONS.forEach((dest, index) => {
                this.getRoute2(this.props.location.state.lon, this.props.location.state.lat, dest.lon, dest.lat)
                    .then(response => {
                        let routes = {...this.state.routes};
                        let directions = {...this.state.directions};
                        routes[index] = this.parseResponse(response.data);
                        directions[index] = getDirectionsFromResponse(response.data);
                        console.log("Direcciones ("+index+"): ", directions[index].map(translateDirection));
                        this.setState({routes, directions});
                    }).catch(response => {
                    alert("No se puede calcular la distancia.")
                    console.log("ERROR AL CALCULAR DISTANCIA: ", response)
                })

            })
            
        }

        document.onkeydown = this.checkKey;
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

    invertTuple = (tuple) => ([tuple[1], tuple[0]]);

    parseResponse = (response) => {
        return {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                bbox: response.routes[0].bbox,
                geometry: {
                    type: "LineString",
                    coordinates: decodePolyline(response.routes[0].geometry, false).map(this.invertTuple)
                },
                properties: {
                    segments: response.routes[0].segments,
                    summary: response.routes[0].summary,
                    way_points: response.routes[0].way_points
                }
            }],
            bbox: response.bbox,
            metadata: response.metadata
        }
    }

    getRoute2 = (startLongitude, startLatitude, endLongitude, endLatitude) => {
        const requestUrl = URL + PROFILE;
        console.log("Polygon:", POLYGON);
        return axios.post(requestUrl, {
            coordinates: [[startLongitude, startLatitude], [endLongitude, endLatitude]],
            options: { avoid_polygons: POLYGON.geometry }
        }, {
            headers: { Authorization: API_KEY }
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
            color: this.highlightKey(key) ? "#0b35fc" : ((!!this.state.selectedPath || !!this.state.mouseOverPath) ? "grey" : COLORS[key])
        }
    }

    getPolygonStyles = () => {
        return {
            fillColor: "green",
            color: "green"
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
                <>
                    <h1>Seleccioná tu camino de evacuación</h1>
                    <h2>Al seleccionar un camino podrás acceder a las indicaciones escritas.</h2>
                </>
                :
                <div>
                    <h1>Impresión de mapa</h1>
                    <h2>Lo que veas ahora en el mapa es lo que se va a imprimir. Asegurá que se vea claro el camino. Si no tenés impresora se guardará como pdf</h2>
                </div>
            }
            <div id='map-container'>
                <Map
                    center={this.state.center} zoom={this.state.zoom}
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
                    <GeoJSON
                        key={"test"}
                        data={POLYGON}
                        style={this.getPolygonStyles}
                    />
                    <Polygon pathOptions={ {color: 'purple'} } positions={multipolygons}/>
                        
                    
                        <Marker 
                            icon={IconHouse}
                            position={[this.props.location.state.lat, this.props.location.state.lon]}
                        />
                    {Object.keys(this.state.routes).map(key=>{
                        return(
                            <Marker position={[DESTINATIONS[key].lat, DESTINATIONS[key].lon]} icon={NodeIcon(DESTINATIONS[key].name)}>
                                    
                            </Marker>
                    )
                    })}
                    
                            
                </Map>
            </div>
            <br/>
            { !this.state.print && Object.keys(this.state.routes).filter(key => !this.state.print ||  key === this.state.selectedPath).map(key =>
                <>
                <Button 
                    className={'button inline '+(this.state.selectedPath === key || this.state.mouseOverPath === key ? 'selected' : '')} 
                    onClick={() => this.setState({ selectedPath: key })}>
                        {DESTINATIONS[key].name}
                    </Button>
                </>
            ) }
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
            { !!this.state.selectedPath &&
            <div id="directions">
                <h2>Indicaciones</h2>
                <ol style={{textAlign: "left"}}>
                { this.state.directions[this.state.selectedPath].map((direction) => (
                    <li style={{padding: "5px", marginLeft: "20px"}}>
                        {translateDirection(direction)}
                    </li>
                )) }
                </ol>
            </div>
            }
        </Template>
    )
}