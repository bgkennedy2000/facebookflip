class OmniauthCallbacksController < Devise::OmniauthCallbacksController



  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      flash.notice = "Signed in Through Facebook!"
      sign_in_and_redirect @user
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      flash.notice = "Problem creating account"
      redirect_to new_user_registration_url
    end
  end


end