class AddUserProfitToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :user_profit, :float
  end
end
