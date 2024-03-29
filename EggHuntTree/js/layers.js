addLayer("e", {
    name: "easter eggs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🥚", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFCDD2",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "eggs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exp = new Decimal(1)
        exp = player.e.points.sqrt()
        if (player.e.points.gte(5)) exp = exp.mul(1.597)
        if (player.e.points.gte(9)) exp = exp.mul(1.3)
        return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Collect an Easter Egg", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "Basic Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Multiply points by eggs. (Effect: " + format(player.e.points.pow(4).pow(player.b.points.plus(1).sqrt().div(2).plus(2)).pow(1.5))+ ")"
                } else if (hasMilestone('e', 7)) {
                    return "Multiply points by eggs. (Effect: " + format(player.e.points.pow(4).pow(player.b.points.plus(1).sqrt().div(2).plus(2)))+ ")"
                } else if (hasMilestone('e', 4)) {
                    return "Multiply points by eggs. (Effect: " + format(player.e.points.pow(player.b.points.plus(1).sqrt().div(2).plus(2)))+ ")"
                } else if (hasMilestone('e', 2)) {
                    return "Multiply points by eggs (Effect: " + format(player.e.points.pow(2))+ ")"
                } else {
                    return "Multiply points by eggs. (Effect: " + format(player.e.points)+ ")"
                }
            },
            done() { return player.e.points.gte(1) }
        },
        1: {
            requirementDescription: "Spotted Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Points multiply themselves. (Effect: " + format(player.points.mul(upgradeEffect('b', 13)).plus(1).log(1.000001).plus(1).pow(1.5)) + ")"
                } else if (hasUpgrade('b', 13)) {
                    return "Points multiply themselves. (Effect: " + format(player.points.mul(upgradeEffect('b', 13)).plus(1).log(1.000001).plus(1)) + ")"
                } else {
                    return "Points multiply themselves. (Effect: " + format(player.points.plus(1).log(1.000001).plus(1)) + ")"
                }
            },
            done() { return player.e.points.gte(2) },
            unlocked() {return hasMilestone('e', 0)}
        },
        2: {
            requirementDescription: "Shiny Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Raise the effect of the Basic Egg to the power of 2. (Effect: " + format(player.b.points.plus(1).sqrt().div(2).plus(2).pow(1.5)) + ")"
                } else {
                return "Raise the effect of the Basic Egg to the power of 2. (Effect: " + format(player.b.points.plus(1).sqrt().div(2).plus(2)) + ")"
                }
            },
            done() { return player.e.points.gte(3) },
            unlocked() {return hasMilestone('e', 1)}
        },
        3: {
            requirementDescription: "Low Poly Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Raise point gain to the power of 1.25. (Effect: " + format(upgradeEffect('b', 11).plus(1.25).pow(1.5)) + ")"
                } else 
                if (hasUpgrade('b', 11)) {
                    return "Raise point gain to the power of 1.25. (Effect: " + format(upgradeEffect('b', 11).plus(1.25)) + ")"
                } else {
                    return "Raise point gain to the power of 1.25. (Effect: 1.25)"
                }
            },
            done() { return player.e.points.gte(4) },
            unlocked() {return hasMilestone('e', 2)}
        },
        4: {
            requirementDescription: "Plastic Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Unlock Baskets. Baskets add to Shiny Egg's effect. (Effect: " + format(player.b.points.plus(1).sqrt().div(2).pow(1.5)) + ")"
                } else 
                return "Unlock Baskets. Baskets add to Shiny Egg's effect. (Effect: " + format(player.b.points.plus(1).sqrt().div(2)) + ")"
            },
            done() { return player.e.points.gte(5) },
            unlocked() {return hasMilestone('e', 3)}
        },
        5: {
            requirementDescription: "Cracked Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Baskets multiply point gain. (Effect: " + format(player.b.points.pow(0.2).plus(1).mul(upgradeEffect('b', 12)).pow(upgradeEffect('b', 14)).pow(1.5)) + ")"
                } else
                if (hasUpgrade('b', 14)) {
                    return "Baskets multiply point gain. (Effect: " + format(player.b.points.pow(0.2).plus(1).mul(upgradeEffect('b', 12)).pow(upgradeEffect('b', 14))) + ")"
                } else if (hasUpgrade('b', 12)) {
                    return "Baskets multiply point gain. (Effect: " + format(player.b.points.pow(0.2).plus(1).mul(upgradeEffect('b', 12))) + ")"
                } else {
                    return "Baskets multiply point gain. (Effect: " + format(player.b.points.pow(0.2).plus(1)) + ")"
                }
            },
            done() { return player.e.points.gte(6) },
            unlocked() {return hasMilestone('e', 4)}
        },
        6: {
            requirementDescription: "Dotted Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Eggs multiply baskets. (Effect: " + format(player.e.points.pow(1.5)) + ")"
                } else
                return "Eggs multiply baskets. (Effect: " + format(player.e.points) + ")"
            },
            done() { return player.e.points.gte(7) },
            unlocked() {return hasMilestone('e', 5)}
        },
        7: {
            requirementDescription: "Natural Egg",
            effectDescription() {
                if (hasMilestone('e', 8)) {
                    return "Raise eggs in the formula for the Basic Egg by 4. (Effect: " + format(new Decimal(4).pow(1.5)) + ")"
                } else 
                return "Raise eggs in the formula for the Basic Egg by 4. (Effect: " + format(new Decimal(4)) + ")"
            },
            done() { return player.e.points.gte(8) },
            unlocked() {return hasMilestone('e', 6)}
        },
        8: {
            requirementDescription: "The Eggosaurus",
            effectDescription() {
                return "All eggs' effect before this one are raised to the power of 1.5. (Effect: " + format(new Decimal(1.5)) + ")"
            },
            done() { return player.e.points.gte(9) },
            unlocked() {return hasMilestone('e', 7)}
        },
        8: {
            requirementDescription: "Golden Egg",
            effectDescription() {
                return "Beat the game."
            },
            done() { return player.e.points.gte(10) },
            unlocked() {return hasMilestone('e', 8)}
        },
    }
})
addLayer("b", {
    name: "baskets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#795548",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "baskets", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        if (player.b.points.lte(10)) {
            return new Decimal(0.2)
        } else {return new Decimal(1).div(player.b.points.div(2).plus(1))}
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect('b', 12))
        if (hasMilestone('e', 6)) mult = mult.mul(player.e.points)
        return mult
    },
    softcap() {return new Decimal(1e4)},
    softcapPower() {return new Decimal(0.1)},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Gain Baskets", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('e', 4)},
    upgrades: {
        11: {
            title: "Low Poly Basket",
            description: () => "The Plastic Egg adds to the Low Poly Egg's effect at a reduced rate. (Effect: " + format(upgradeEffect('b', 11)) + ")",
            cost: new Decimal(10),
            effect() {
                return player.b.points.plus(1).sqrt().sqrt()
            },
            onPurchase() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
            }
        },
        12: {
            title: "Plastic Basket",
            description: () => "The Plastic Egg multiplies the Cracked Egg's effect.",
            cost: new Decimal(500),
            effect() {
                return player.b.points.plus(1).sqrt()
            },
            onPurchase() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
            },
            unlocked() {return hasUpgrade('b', 11)}
        },
        13: {
            title: "Spotted Basket",
            description: () => "Baskets multipliy points in the formula for the Spotted Egg. (Effect: " + format(upgradeEffect('b', 13)) + ")",
            cost: new Decimal(750),
            effect() {
                return player.b.points.plus(1).pow(1.5)
            },
            onPurchase() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
            },
            unlocked() {return hasUpgrade('b', 12)}
        },
        14: {
            title: "Shiny Basket",
            description: () => "The Shiny Egg also affects the Cracked Egg at a reduced rate, and unlock basket buyables. (Effect: " + format(upgradeEffect('b', 14)) + ")",
            cost: new Decimal(1000),
            effect() {
                return player.b.points.plus(1).sqrt().div(2).plus(2).sqrt()
            },
            onPurchase() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
            },
            unlocked() {return hasUpgrade('b', 13)}
        },
    },
    buyables: {
        11: {
            title: "Baskets To Points",
            display() { return "Multiplying points by x" + format(buyableEffect(this.layer, this.id)) + "\nAmount: " + format(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " baskets"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasUpgrade('b', 14)},
            effect() {
                return new Decimal(100).pow(getBuyableAmount(this.layer, this.id))
            },
            cost() {
                return new Decimal(1000).mul(new Decimal(20).pow(getBuyableAmount(this.layer, this.id)))
            }
        },
        12: {
            title: "Points To Baskets",
            display() { return "Multiplying baskets by x" + format(buyableEffect(this.layer, this.id)) + "\nAmount: " + format(getBuyableAmount(this.layer, this.id)) + "\nCost: " + format(this.cost()) + " points"},            canAfford() { return player[this.layer].points.gte(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.b.points = new Decimal(0)
                player.points = new Decimal(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return hasUpgrade('b', 14)},
            effect() {
                return new Decimal(1.5).pow(getBuyableAmount(this.layer, this.id))
            },
            cost() {
                return new Decimal(1e100).pow(getBuyableAmount(this.layer, this.id).div(10).plus(1))
            }
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text", "Note: The more baskets you have, the less you will gain on your next reset!"],
        ["display-text", "Upgrades will also cost ALL your baskets and will reset points."],
        "blank",
        "upgrades",
        "buyables"
    ]
})
