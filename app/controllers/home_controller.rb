class HomeController < ApplicationController
  def index
    if user_signed_in?
      @photos = current_user.get_photo_array
    else
      @photos = User.default_photos
    end
  end

  def privacy_policy

  end
end
