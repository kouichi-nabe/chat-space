Rails.application.routes.draw do
  resources :messages, only: :index
  root to: 'messages#index'
end
