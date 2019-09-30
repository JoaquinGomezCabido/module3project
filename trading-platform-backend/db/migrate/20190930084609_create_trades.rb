class CreateTrades < ActiveRecord::Migration[6.0]
  def change
    create_table :trades do |t|
      t.string :type
      t.float :price
      t.string :date
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
