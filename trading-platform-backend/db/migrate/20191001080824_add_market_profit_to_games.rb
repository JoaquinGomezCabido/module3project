class AddMarketProfitToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :market_profit, :float
  end
end
