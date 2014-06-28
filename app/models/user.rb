class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body


  def self.from_omniauth(auth)
    if user = User.find_by_email(auth.info.email)
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.token = auth.credentials.token
      user.image_url = auth.info.image
      user
    else
      where(auth.slice(:provider, :uid)).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email || "#{auth.provider}#{auth.uid}@fakemail.com"
        user.password = Devise.friendly_token[0,20]
        user.token = auth.credentials.token
        user.image_url = auth.info.image
        user
      end
    end   
  end
    
  def get_photo_array
    response = HTTParty.get("https://graph.facebook.com/#{uid}/photos?access_token=#{token}&limit=100") 
    hash = JSON.parse(response.body)
    hash['data'].collect { |x| x['source'] }.sample(8)
  end

  def self.default_photos
    [ 
      "beonce.png",
      "googleplus.png",
      "linkedin.png",
      "pinterest.png",
      "rss.png",
      "twitter.png",
      "vimeo.png",
      "youtube.png"
    ]
  end





end
