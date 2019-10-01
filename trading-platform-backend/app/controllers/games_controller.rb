class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.create(game_params(:company, :user_id, :score, :user_profit, :market_profit))
    render json: game
  end

  def update
    game = Game.find(params[:id])
    game.update(game_params(:score, :user_profit, :market_profit))
    render json: game
  end

  private

  def game_params(*args)
    params.require(:game).permit(*args)
  end
end
