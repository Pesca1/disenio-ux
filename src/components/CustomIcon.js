import L from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

const RedIcon = new L.DivIcon({
    className: 'custom-marker red'
});

const BlueIcon = name => new L.DivIcon({
    className: 'custom-marker blue', 
    html: name
});

const IconHouse = new L.DivIcon({
    iconUrl: require("../assets/Home_free_icon.svg"),
    iconRetinaUrl: require("../assets/Home_free_icon.svg"),    
    className: 'leaflet-div-icon'
    
});

const PolygonWithText = props => {
    
    const text = L.divIcon({html: props.text});
  
    return(      
        <Marker position={props.coord} icon={text} />
      
    );
  }

const DangerIcon = new L.DivIcon({
    className: 'custom-marker danger'
});


export {BlueIcon, RedIcon,IconHouse, DangerIcon, PolygonWithText };
