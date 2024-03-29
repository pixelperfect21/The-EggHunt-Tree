let modInfo = {
	name: "The Egg Hunt Tree (POLYJAM 2024: EASTER)",
	id: "hipolugondonute",
	author: "Team Nihahaha",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Hopefully The Only Necessary Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasMilestone('e', 0)) {
		if (hasMilestone('e', 2)) {
			if (hasMilestone('e', 4)){
				if (hasMilestone('e', 8)) {
					gain = gain.mul(player.e.points.pow(player.b.points.plus(1).sqrt().div(2)).pow(1.5))
                } else 
				gain = gain.mul(player.e.points.pow(player.b.points.plus(1).sqrt().div(2)))
			} else gain = gain.mul(player.e.points.pow(2))
		} else {gain = gain.mul(player.e.points)}
	}
	if (hasMilestone('e', 1)) {
		if (hasUpgrade('b', 13)) {
			if (hasMilestone('e', 8)) {
				gain = gain.mul(player.points.mul(upgradeEffect('b', 13)).plus(1).log(1.000001).plus(1).pow(1.5))
			} else 
			gain = gain.mul(player.points.mul(upgradeEffect('b', 13)).plus(1).log(1.000001).plus(1))
		} else {gain = gain.mul(player.points.plus(1).log(1.000001).plus(1))}
	}
	if (hasMilestone('e', 3)) {
		if (hasUpgrade('b', 11)) {
			if (hasMilestone('e', 8)) {
				gain = gain.pow(new Decimal(1.25).plus(upgradeEffect('b', 11).pow(1.5)))
			} else 
			gain = gain.pow(new Decimal(1.25).plus(upgradeEffect('b', 11)))
		} else {gain = gain.pow(1.25)}
	}
	if (hasMilestone('e', 5)) {
		if (hasMilestone('e', 8)) {
			gain = gain.mul(player.b.points.pow(0.2).plus(1)).pow(1.5)
		} else gain = gain.mul(player.b.points.pow(0.2).plus(1))
	}
	gain = gain.mul(buyableEffect('b', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.e.points.gte(10)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}