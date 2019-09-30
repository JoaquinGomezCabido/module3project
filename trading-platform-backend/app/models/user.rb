class User < ApplicationRecord
    has_many :games
    has_many :trades, through: :games
end
