class TradesController < ApplicationController
  def index
    trades = Trade.all
    render json: trades
  end

  def create
    byebug
    trade = Trade.create(trade_params)
    render json: trade
  end

  private

  def trade_params
    params.require(:trade).permit(:order, :price, :date, :type, :game_id)
  end
end
