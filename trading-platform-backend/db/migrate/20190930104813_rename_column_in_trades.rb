class RenameColumnInTrades < ActiveRecord::Migration[6.0]
  def change
    rename_column :trades, :type, :order
  end
end
