Rails.application.routes.draw do
  resources :favorites, only: [:index, :show, :create]
  resources :users, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
