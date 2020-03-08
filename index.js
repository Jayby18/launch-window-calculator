class PlanetaryBody {
    constructor(
        refBody,
        semiMajorAxis,
        eccentricity,
        inclination,
        mass,
        radius
    ) {
        this.refBody = refBody
        this.semiMajorAxis = semiMajorAxis
        this.eccentricity = eccentricity
        this.inclination = inclination
        this.mass = mass
        this.radius = radius
    }
}

function calculateLaunchWindow(origin, destination) {
    return (180 * (1 - (((origin.semiMajorAxis + destination.semiMajorAxis)/(2 * destination.semiMajorAxis)) ** 1.5)))
}

let Sun = new PlanetaryBody()
let Earth = new PlanetaryBody(
    Sun,
    1.00000102,
    0.0167086,
    7.155,
    5.97237 * (10 ^ 24),
    6371000
)
let Mars = new PlanetaryBody(
    Sun,
    1.523679,
    0.0934,
    5.65,
    6.4171 * (10 ^ 23),
    3389500
)

function calcForm() {
    var angleTraversed = 180

    var r1 = document.getElementById("inputRadius1").value
    var r2 = document.getElementById("inputRadius2").value
    var atx = document.getElementById("inputTransferOrbit").value

    if(r1 == null || r1 == "" || r2 == null || r2 == "")
    {
        alert("Parking orbit and destination orbit cannot be empty.")
        return
    } else {
        r1 = parseFloat(r1)
        r2 = parseFloat(r2)
    }

    if(atx != null && atx != "")
    {
        atx = parseFloat(atx)
        var transferEcc = 1 - (r1 / atx)
        angleTraversed = (Math.acos((atx * (1 - transferEcc ** 2) / r2 - 1) / transferEcc)) * (180 / Math.PI)
        console.log(angleTraversed)
    }

    phaseAngle = angleTraversed * (1 - ((r1 + r2) / (2 * r2)) ** 1.5)
    console.log(phaseAngle)

    if (!isNaN(phaseAngle)) {
        document.getElementById("js_output").innerHTML =
            "Phase Angle: " + phaseAngle + "°"
    } else {
        alert("Invalid inputs. Please try again.")
    }
}

function handleInputChange() {
    if(document.getElementById("inputRadius1").value != null && document.getElementById("inputRadius1").value != "" && document.getElementById("inputRadius2").value != null && document.getElementById("inputRadius2").value != "") {
        calcForm()
    } else {
        console.log("Inputs still empty")
    }
}
