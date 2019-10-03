# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trade.destroy_all
Game.destroy_all
User.destroy_all

geo = User.create(username: "geo")
paco = User.create(username: "paco")
tegs = User.create(username: "tegs")
olib = User.create(username: "olib")
aude = User.create(username: "aude")
will = User.create(username: "will")
sohaib = User.create(username: "sohaib")
erin = User.create(username: "erin")
chris = User.create(username: "chris")
polly = User.create(username: "polly")
angie = User.create(username: "angie")
neumann = User.create(username: "Adam Neumann")

Game.create(user: geo, company: "$ettlr", score: -5)
Game.create(user: paco, company: "HuYu", score: 5)
Game.create(user: angie, company: "Lucky Sloth", score: 6)
Game.create(user: erin, company: "Better Than Telly", score: -2)
Game.create(user: will, company: "Mabel", score: 5)
Game.create(user: chris, company: "Flipbook", score: -10)
Game.create(user: geo, company: "Donation Station", score: 2)
Game.create(user: sohaib, company: "Donation Station", score: 3)
Game.create(user: tegs, company: "Gwack-a-mole", score: 2)

apple_game = Game.create(user: geo, company: "Apple", score: 2)
uber_game = Game.create(user: geo, company: "Uber", score: -4)
tesla_game = Game.create(user: paco, company: "Tesla", score: 1)
wework_game = Game.create(user: neumann, company: "WeWork", score: -40)

Trade.create(game: apple_game, order: "buy", price: 100, date: "01/01/2014")
Trade.create(game: apple_game, order: "sell", price: 500, date: "01/10/2017")

Trade.create(game: uber_game, order: "buy", price: 100, date: "01/01/2014")
Trade.create(game: uber_game, order: "sell", price: 900, date: "01/10/2014")
Trade.create(game: uber_game, order: "buy", price: 200, date: "01/05/2018")

Trade.create(game: tesla_game, order: "sell", price: 100, date: "01/01/2014")
Trade.create(game: tesla_game, order: "buy", price: 1000, date: "01/12/2018")

Trade.create(game: wework_game, order: "buy", price: 100, date: "01/01/2014")
Trade.create(game: wework_game, order: "sell", price: 400, date: "01/01/2015")
Trade.create(game: wework_game, order: "buy", price: 300, date: "01/01/2016")
Trade.create(game: wework_game, order: "sell", price: 1, date: "01/09/2019")