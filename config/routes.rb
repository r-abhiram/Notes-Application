Rails.application.routes.draw do

  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index]
      post 'notes/create'
      put 'note/:id', to: 'notes#update'
      get 'note/:id', to: 'notes#show'
      delete 'destroy/:id', to: 'notes#destroy'
    end
  end

  get '/*path' => 'home#index'

end
