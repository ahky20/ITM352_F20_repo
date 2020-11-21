products =
    [
        // Product 1
        {
            "type": "Moon Ball",
            "price": 3.00,
            "image": "https://cdn.bulbagarden.net/upload/0/0e/SugimoriMoonBall.png",
            "description": "Makes it easier to catch Pokemon that can evolve using a Moon Stone."
        },
        // Product 2
        {
            "type": "Friend Ball",
            "price": 3.00,
            "image": "https://cdn.bulbagarden.net/upload/4/4d/SugimoriFriendBall.png",
            "description": "Makes Pokemon caught in this Poke Ball more friendly towards you immediately."
        },
        // Product 3
        {
            "type": "Net Ball",
            "price": 10.00,
            "image": "https://cdn.bulbagarden.net/upload/e/ed/SugimoriNetBall.png",
            "description": "More effective in catching Water or Bug type Pokemon."
        },
        // Product 4
        {
            "type": "Dive Ball",
            "price": 10.00,
            "image": "https://cdn.bulbagarden.net/upload/8/85/SugimoriDiveBall.png",
            "description": "Works especially well with Pokemon that live underwater."
        },
        // Product 5
        {
            "type": "Luxury Ball",
            "price": 10.00,
            "image": "https://cdn.bulbagarden.net/upload/b/b1/SugimoriLuxuryBall.png",
            "description": "A comfortable Poke Ball, Pokemon quickly grow friendly after being caught."
        },
        // Product 6
        {
            "type": "Premier Ball",
            "price": 20.00,
            "image": "https://cdn.bulbagarden.net/upload/a/a1/SugimoriPremierBall.png",
            "description": "Somewhat rare, made as a commerative item used to celebrate an event of some sort."
        }
    ];

// Code from Lab13 product_data.js
if (typeof module != 'undefined') {
    module.exports.products = products;
}