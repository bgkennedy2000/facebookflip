class OmniauthCallbacksController < Devise::OmniauthCallbacksController



  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    puts @user
    puts @user.provider 
    puts @user.uid 
    puts @user.email 
    puts @user.token 
    puts @user.image_url 

    if @user.persisted?
      flash.notice = "Signed in Through Facebook!"
      sign_in_and_redirect @user
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      flash.notice = "Problem creating account"
      redirect_to root_path
    end
  end


end