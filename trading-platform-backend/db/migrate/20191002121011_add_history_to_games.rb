class AddHistoryToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :history, :string
  end
end
