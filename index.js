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

const GM = 1.327124 * (10 ** 20)
const aVelMars = 0.5240

function deltaVelocity(ra, rb, atx) {
    let velInitA = Math.sqrt(GM / ra)
    let velFinalB = Math.sqrt(GM / rb)
    let deltaVa = Math.sqrt(GM * (2 / ra - 1 / atx)) - velInitA
    let deltaVb = Math.sqrt(GM * (2 / rb - 1 / atx)) - velFinalB
    let totalDeltaV = deltaVa + deltaVb
    return totalDeltaV
}

function timeOfFlight(ra, rb, atf) {
    let atfMeters = atf * 149.597870 * (10 ** 9)
    let e = 1 - (ra / atf)
    let v = Math.acos((atf * (1 - e ** 2) / rb - 1)/ e)
    let E = Math.acos((e + Math.cos(v)) / (1 + e * Math.cos(v)))
    let TOF = (E - e * Math.sin(E)) * Math.sqrt((atfMeters ** 3)/ GM)
    return TOF
}

function calcForm() {
    var angleTraversed = 180

    var r1 = document.getElementById("inputRadius1").value
    var r2 = document.getElementById("inputRadius2").value
    atx = document.getElementById("inputTransferOrbit").value

    if(r1 == null || r1 == "" || r2 == null || r2 == "")
    {
        alert("Parking orbit and destination orbit cannot be empty.")
        return
    } else {
        r1 = parseFloat(r1)
        r2 = parseFloat(r2)
    }

    // Check if user specified a semi-major axis, if not set it to the mean of the two radii
    if(atx != null && atx != "")
    {
        atx = parseFloat(atx)
        var transferEcc = 1 - (r1 / atx)
        angleTraversed = (Math.acos((atx * (1 - transferEcc ** 2) / r2 - 1) / transferEcc)) * (180 / Math.PI)
        console.log(angleTraversed)
        console.log("deltaV = " + deltaVelocity(r1, r2, atx))
    } else {
        atx = (r1 + r2) / 2
    }

    // Calculate time of flight (tof) using function above
    var tof = timeOfFlight(r1, r2, atx)
    console.log("TOF= " + tof)
    if (!isNaN(tof)) {
        document.getElementById("tof-text").innerHTML = "ToF: " + tof / 86400 + " days"
    } else {
        document.getElementById("tof-text").innerHTML = ""
    }

    // Calculate phase angle using simple formula from KSP forum
    phaseAngle = angleTraversed * (1 - ((r1 + r2) / (2 * r2)) ** 1.5)
    console.log("Phase1: " + phaseAngle)

    // Calculate phase angle using more complex formula from braeunig.us
        phaseAngle_alt = angleTraversed - aVelMars * (tof / 86400)
    console.log(angleTraversed)
    console.log("Phase2: " + phaseAngle_alt)

    if (!isNaN(phaseAngle_alt)) {
        document.getElementById("js_output").innerHTML =
            "Phase Angle: " + phaseAngle_alt + "\xB0"
    } else {
        alert("Invalid inputs. Please try again.")
    }
}

function handleInputChange() {
    /* if(document.getElementById("inputRadius1").value != null && document.getElementById("inputRadius1").value != "" && document.getElementById("inputRadius2").value != null && document.getElementById("inputRadius2").value != "") {
        calcForm()
    } else {
        console.log("Inputs still empty")
    } */
}
