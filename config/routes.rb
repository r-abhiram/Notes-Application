Rails.application.routes.draw do

  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index]
      post 'notes/create'
      put 'note/:id', to: 'notes#update'
      get 'note/:id', to: 'notes#show'
      delete 'destroy/:id', to: 'notes#destroy'

      post 'users/create'
      post 'user/login', to: "users#login"
      # get 'user/loggedIn', to: 'users#check'

      get 'images/url', to: "images#generate_presigned_url"
    end
  end

  get '/*path' => 'home#index'

end
