import L from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

const redCrossIcon = name => "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "\t viewBox=\"0 0 336 336\" style=\"enable-background:new 0 0 336 336;\" xml:space=\"preserve\">\n" +
    "<g>\n" +
    "\t<g>\n" +
    "\t\t<path d=\"M300.76,95.08L300.76,95.08l-60,0v-60C240.651,15.736,224.984,0.087,205.64,0h-75.28\n" +
    "\t\t\tc-19.453,0.022-35.218,15.787-35.24,35.24v60h-60C15.76,95.328,0.088,111,0,130.36v75.32c0.022,19.453,15.787,35.218,35.24,35.24\n" +
    "\t\t\th60v60c0.109,19.344,15.776,34.993,35.12,35.08h75.28c19.453-0.022,35.218-15.787,35.24-35.24v-60h60\n" +
    "\t\t\tc19.344-0.087,35.011-15.736,35.12-35.08v-75.32C336,110.891,320.229,95.102,300.76,95.08z\"/>\n" +
    "\t</g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "</svg><h4>"+name+"</h4>";

const HouseIcon = "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
    "\t viewBox=\"0 0 460.298 460.297\" style=\"enable-background:new 0 0 460.298 460.297;\"\n" +
    "\t xml:space=\"preserve\">\n" +
    "<g>\n" +
    "\t<g>\n" +
    "\t\t<path d=\"M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041\n" +
    "\t\t\tc0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629\n" +
    "\t\t\tc4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939\n" +
    "\t\t\tz\"/>\n" +
    "\t\t<path d=\"M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816\n" +
    "\t\t\tc-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245\n" +
    "\t\t\tc-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136\n" +
    "\t\t\tc-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998\n" +
    "\t\t\tL230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125\n" +
    "\t\t\tc1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z\"/>\n" +
    "\t</g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "<g>\n" +
    "</g>\n" +
    "</svg>";

const RedIcon = new L.DivIcon({
    className: 'custom-marker red'
});

const BlueIcon = name => new L.DivIcon({
    className: 'custom-marker blue', 
    html: name
});

const IconHouse = new L.DivIcon({
    className: 'house-icon',
    html: HouseIcon
});

const NodeIcon = name => new L.DivIcon({
    className: 'node-icon',
    html: redCrossIcon(name)
});

const PolygonWithText = props => {
    
    const text = L.divIcon({html: props.text});
  
    return(      
        <Marker position={props.coord} icon={text} />
      
    );
  }

export {BlueIcon, RedIcon,IconHouse, PolygonWithText, NodeIcon };
