
/**
 * Decode an x,y or x,y,z encoded polyline
 * @param {*} encodedPolyline
 * @param {Boolean} includeElevation - true for x,y,z polyline
 * @returns {Array} of coordinates
 */
export const decodePolyline = (encodedPolyline, includeElevation) => {
    // array that holds the points
    let points = []
    let index = 0
    const len = encodedPolyline.length
    let lat = 0
    let lng = 0
    let ele = 0
    while (index < len) {
        let b
        let shift = 0
        let result = 0
        do {
            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63 // finds ascii
            // and subtract it by 63
            result |= (b & 0x1f) << shift
            shift += 5
        } while (b >= 0x20)

        lat += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
        shift = 0
        result = 0
        do {
            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63
            result |= (b & 0x1f) << shift
            shift += 5
        } while (b >= 0x20)
        lng += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))

        if (includeElevation) {
            shift = 0
            result = 0
            do {
                b = encodedPolyline.charAt(index++).charCodeAt(0) - 63
                result |= (b & 0x1f) << shift
                shift += 5
            } while (b >= 0x20)
            ele += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
        }
        try {
            let location = [(lat / 1E5), (lng / 1E5)]
            if (includeElevation) location.push((ele / 100))
            points.push(location)
        } catch (e) {
            console.log(e)
        }
    }
    return points
}

export const getDirectionsFromResponse = (response) => {
    try {
        return response.routes[0].segments[0].steps.map(({name, instruction, distance}) => ({ name, instruction, distance }));
    } catch (e) {
        return [];
    }
}

export const translateDirection = ({name, instruction, distance}) => {
    distance = Math.ceil(distance);

    if (instruction.indexOf("Head northwest on") !== -1)
        return "Avance " + distance + " metros hacia el noroeste por " + name + ".";
    if (instruction.indexOf("Head southwest on") !== -1)
        return "Avance " + distance + " metros hacia el suroeste por " + name + ".";
    if (instruction.indexOf("Head northeast on") !== -1)
        return "Avance " + distance + " metros hacia el noreste por " + name + ".";
    if (instruction.indexOf("Head southeast on") !== -1)
        return "Avance " + distance + " metros hacia el sureste por " + name + ".";

    if (instruction.indexOf("Head east on") !== -1)
        return "Avance " + distance + " metros hacia el este por " + name + ".";
    if (instruction.indexOf("Head south on") !== -1)
        return "Avance " + distance + " metros hacia el sur por " + name + ".";
    if (instruction.indexOf("Head west on") !== -1)
        return "Avance " + distance + " metros hacia el oeste por " + name + ".";
    if (instruction.indexOf("Head north on") !== -1)
        return "Avance " + distance + " metros hacia el norte por " + name + ".";

    if ((instruction.indexOf("Turn left onto") !== -1)  || (instruction.indexOf("Turn sharp left onto") !== -1))
        return "Gire a la izquierda en " + name + " y continue " + distance + " metros.";
    if ((instruction.indexOf("Turn right onto") !== -1) || (instruction.indexOf("Turn sharp right onto") !== -1))
        return "Gire a la derecha en " + name + " y continue " + distance + " metros.";

    if (instruction.indexOf("Turn slight right onto") !== -1)
        return "Gire ligeramente a la derecha en " + name + " y continue " + distance + " metros.";
    if (instruction.indexOf("Turn slight left onto") !== -1)
        return "Gire ligeramente a la izquierda en " + name + " y continue " + distance + " metros.";

    if ((instruction.indexOf("Turn right") !== -1) || (instruction.indexOf("Turn sharp right") !== -1))
        return "Gire a la derecha y continue " + distance + " metros.";
    if ((instruction.indexOf("Turn left") !== -1) || (instruction.indexOf("Turn sharp left") !== -1))
        return "Gire a la izquierda y continue " + distance + " metros.";

    if (instruction.indexOf("Turn slight right") !== -1)
        return "Gire ligeramente a la derecha y continue " + distance + " metros.";
    if (instruction.indexOf("Turn slight left") !== -1)
        return "Gire ligeramente a la izquierda y continue " + distance + " metros.";

    if (instruction.indexOf("Continue straight onto") !== -1)
        return "Continue por " + name + " durante " + distance + " metros.";
    if (instruction.indexOf("Keep left onto") !== -1)
        return "Mantengace a la izquierda por " + name + " durante " + distance + " metros.";
    if (instruction.indexOf("Keep right onto") !== -1)
        return "Mantengace a la derecha por " + name + " durante " + distance + " metros.";
    if (instruction.indexOf("Keep left") !== -1)
        return "Mantengace a la izquierda durante " + distance + " metros.";
    if (instruction.indexOf("Keep right") !== -1)
        return "Mantengace a la derecha durante " + distance + " metros.";

    if (instruction.indexOf("Arrive at") !== -1)
        return "Final del recorrido.";

    console.log("Instruction not found:", {name, instruction, distance});
    return null;
}