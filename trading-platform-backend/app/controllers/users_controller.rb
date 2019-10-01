class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.find_or_create_by(user_params)
    render json: user
  end

  private

  def user_params
    # byebug
    params.require(:user).permit(:username)
  end
end
