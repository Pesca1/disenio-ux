import React from 'react';
import Template from "./Template";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import { RedIcon, BlueIcon } from "./CustomIcon";
import {Button} from "reakit";

/* Open route service */
const URL = "https://api.openrouteservice.org/v2/directions/"
const API_KEY = "5b3ce3597851110001cf6248eba327ba0377440cac6ca3c8e26ecc63"
const START_POINT = { longitude: -57.969767, latitude: -34.915290 }
const END_POINT = { longitude: -57.951671, latitude: -34.941450 }
const PROFILE = "driving-car"


            

/* Nominatim */
const GEOCODE_URL = "https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2";

export default class AddressSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigFont: this.props.location && this.props.location.state && this.props.location.state.bigFont || false,
            loading: !(this.props.location && this.props.location.state && this.props.location.state.skipSearch || false),
            results: [],
            selectedMarker: null,
            addressNotFound: false,
            center: [-34.911804, -57.954493],
            zoom: 13,
            addressSearchSkipped: this.props.location && this.props.location.state && this.props.location.state.skipSearch || false
        }
    }

    toggleBigFont = () => this.setState({ bigFont: !this.state.bigFont });

    getGeoCodeUrl = () => {
        return GEOCODE_URL +
            `&country=${this.props.location.state.pais}` +
            `&state=${this.props.location.state.provincia}` +
            `&city=${this.props.location.state.ciudad}` +
            `&street=${this.props.location.state.numero},${this.props.location.state.calle}`;
    }

    componentDidMount = async () => {
        
        if (!!this.props.location && !!this.props.location.state && !this.state.addressSearchSkipped) {
            console.log("[CONFIRM_ADDRESS] URL:", this.getGeoCodeUrl());
            axios.get(this.getGeoCodeUrl()).then(response => {
                console.log("[CONFIRM_ADDRESS] Geocoding was successful: ", response);
                let marker = (response.data.length > 0) ? { lat: parseFloat(response.data[0].lat), lon: parseFloat(response.data[0].lon) } : null;
                this.setState({
                    loading: false,
                    results: response.data,
                    addressNotFound: response.data.length === 0,
                    selectedMarker: marker,
                    center: response.data.length === 0 ? this.state.center : [response.data[0].lat, response.data[0].lon]
                })
            }).catch(response => {
                console.log("[CONFIRM_ADDRESS] Error while geocoding: ", response);
                alert("Ocurrió un error al intentar ubicar su dirección! Cliquéelo en el mapa")                
                this.setState({
                    loading: false,
                    results: [],
                    addressNotFound: true,
                    selectedMarker: null,
                    center: this.state.center 
                })
                
            })
        }

        document.onkeydown = this.checkKey;
        document.title = "Selección de domicilio - Prevención de inundaciones"
    }

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

    selectAddress = (event) => {
        this.setState({
            selectedMarker: { lat: event.latlng.lat, lon: event.latlng.lng }
        })
    }

    isMarkerSelected = (latitude, longitude) => {
        return this.state.selectedMarker !== null && (latitude === this.state.selectedMarker.lat) && (longitude === this.state.selectedMarker.lon);
    }

    pointInMap = (event) => {
        if (this.state.addressNotFound || this.state.addressSearchSkipped)
            this.setState({ selectedMarker: { lat: event.latlng.lat, lon: event.latlng.lng } })
    }

    calculatePath = () => {
        this.props.history.push('/path-selection', { ...this.state.selectedMarker, bigFont: this.state.bigFont })
        window.location.reload()
    }

    renderTitle = () => {
        if (this.state.addressSearchSkipped)
            return <h1>¿Podrías señalar tu domicilio en el mapa?</h1>;
        if (this.state.loading || !this.state.addressNotFound)
            return <h1>¿Tu domicilio es el marcado en el mapa?</h1>;
        else if (this.state.addressNotFound && this.state.results.length === 0)
            return <h1>No encontramos tu domicilio :(<br/> ¿Podrías señalarlo en el mapa?</h1>;
        else
            return <h1>¿Podrías señalar tu domicilio en el mapa?</h1>;
    }

    render = () => (
        <Template bigFont={this.state.bigFont} toggleBigFont={this.toggleBigFont}
            goBack={() => {this.props.history.push('/address', { bigFont: this.state.bigFont }); window.location.reload()}}
            containerClass='map-container'>
            {this.renderTitle()}
            <h2>Podés navegar con el mouse o las flechas del teclado, hacer zoom con '+' y '-', y seleccionar un lugar con la teclar 'Enter'</h2>
            <Map
                center={this.state.center} zoom={this.state.zoom}
                crollWheelZoom={true} onClick={this.pointInMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { !this.state.loading && !this.state.addressNotFound && this.state.results.length > 0 &&
                            <Marker
                                key={this.state.results[0].lat + " " + this.state.results[0].lon}
                                position={[parseFloat(this.state.results[0].lat), parseFloat(this.state.results[0].lon)]}
                                icon={BlueIcon}
                            />
                }
                { !this.state.loading && (this.state.addressNotFound || this.state.addressSearchSkipped) && this.state.selectedMarker != null &&
                    <Marker
                        key={this.state.selectedMarker.lat + " " + this.state.selectedMarker.lon}
                        position={[this.state.selectedMarker.lat, this.state.selectedMarker.lon]}
                        icon={RedIcon}
                    />
                }
            </Map>
            { (this.state.addressNotFound || this.state.addressSearchSkipped) && this.state.selectedMarker != null &&
            <Button className='button' onClick={this.calculatePath}>Este es mi domicilio</Button>
            }
            <br/>
            { (!this.state.addressNotFound && !this.state.addressSearchSkipped) && this.state.results.length > 0 &&
                <>
                    <Button
                        onClick={() => this.setState({addressNotFound: true, selectedMarker: null})}
                        className='button negative'>
                        No :( Mi domicilio no está en el mapa
                    </Button>
                    <Button
                        onClick={this.calculatePath}
                        className='button positive'>
                        Sí! Mi domicilio es el indicado
                    </Button>
                </>
            }
        </Template>
    )
}