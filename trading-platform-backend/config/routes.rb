Rails.application.routes.draw do
  get 'users', to: 'users#index'
  post 'users', to: 'users#create'
  get 'games', to: 'games#index'
  post 'games', to: 'games#create'
  patch 'games/:id', to: 'games#update'
  get 'trades', to: 'trades#index'
  post 'trades', to: 'trades#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
