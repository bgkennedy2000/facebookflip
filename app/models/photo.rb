class Photo < ActiveRecord::Base
  attr_accessible :image_url, :user_id
end
