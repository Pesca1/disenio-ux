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
            loading: true,
            result: [],
            selectedMarker: null,
            addressNotFound: false,
        }
    }

    getGeoCodeUrl = () => {
        return GEOCODE_URL +
            `&country=${this.props.location.state.pais}` +
            `&state=${this.props.location.state.provincia}` +
            `&city=${this.props.location.state.ciudad}` +
            `&street=${this.props.location.state.numero},${this.props.location.state.calle}`;
    }

    componentDidMount = async () => {
        if (!!this.props.location && !!this.props.location.state) {
            console.log("[CONFIRM_ADDRESS] URL:", this.getGeoCodeUrl());
            axios.get(this.getGeoCodeUrl()).then(response => {
                console.log("[CONFIRM_ADDRESS] Geocoding was successful: ", response);
                this.setState({
                    loading: false,
                    results: response.data
                })
            }).catch(response => {
                console.log("[CONFIRM_ADDRESS] Error while geocoding: ", response);
                alert("Ocurrió un error al intentar ubicar su dirección!")
            })
        }
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
        if (this.state.addressNotFound)
            this.setState({ selectedMarker: { lat: event.latlng.lat, lon: event.latlng.lng } })
        else
            this.setState({ selectedMarker: null })
    }

    calculatePath = () => {
        this.props.history.push('/path-selection', { ...this.state.selectedMarker })
    }

    render = () => (
        <Template
            goBack={() => this.props.history.push('/address')}
            title={<>Proyecto CITADINE<br/>Prevención de Inundaciones</>}
            containerClass='map-container'>
            <h3>Seleccioná tu domicilio en el mapa</h3>
            <Map
                center={[-34.911804, -57.954493]} zoom={13}
                crollWheelZoom={true} onClick={this.pointInMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { !this.state.loading && !this.state.addressNotFound &&
                    this.state.results.map(result => (
                        this.isMarkerSelected(parseFloat(result.lat), parseFloat(result.lon)) ?
                            <Marker
                                key={result.lat + " " + result.lon}
                                position={[parseFloat(result.lat), parseFloat(result.lon)]}
                                onClick={this.selectAddress}
                                icon={RedIcon}
                            />
                            :
                            <Marker
                                key={result.lat + " " + result.lon}
                                position={[parseFloat(result.lat), parseFloat(result.lon)]}
                                onClick={this.selectAddress}
                                icon={BlueIcon}
                            />
                    ))
                }
                { !this.state.loading && this.state.addressNotFound && this.state.selectedMarker != null &&
                    <Marker
                        key={this.state.selectedMarker.lat + " " + this.state.selectedMarker.lon}
                        position={[this.state.selectedMarker.lat, this.state.selectedMarker.lon]}
                        icon={RedIcon}
                    />
                }
            </Map>
            { this.state.selectedMarker != null &&
                <Button className='button' onClick={this.calculatePath}>Esta es mi dirección</Button>
            }
            <br/>
            { !this.state.addressNotFound &&
                <Button
                    onClick={() => this.setState({addressNotFound: true, selectedMarker: null})}
                    className='button'>
                    Mi dirección no está en el mapa :(
                </Button>
            }
        </Template>
    )
}