class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    # puts "reached"
    byebug
    user = User.create(user_params)
    # puts user
    render json: user
  end

  private

  def user_params
    # byebug
    params.require(:user).permit(:username)
  end
end
