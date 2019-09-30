Rails.application.routes.draw do
  post 'trades/create', as: :new_trade
  get 'games/index', as: :leaderboard
  post 'games/create', as: :new_game
  patch 'games/update', as: :game_end
  post 'users/create', as: :new_user
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
