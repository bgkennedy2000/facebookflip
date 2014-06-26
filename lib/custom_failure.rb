class CustomFailure < Devise::FailureApp
  def redirect_url
    redirect root_path
  end

  def respond
    if http_auth?
      http_auth
    else
      redirect root_path
    end
  end
end