FbFlip::Application.routes.draw do
  devise_for :users, :skip => [:sessions], controllers: { :omniauth_callbacks => "omniauth_callbacks" }

  devise_scope :user do
    get "signin" => "home#index", :as => :new_user_session
    delete 'signout' => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  get "privacypolicy" => "home#privacy_policy", :as => :privacy_policy
  root :to => "home#index"
end
