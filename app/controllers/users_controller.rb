class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params)
      flash[:notice] = '編集成功'
      redirect_to root_path
    else
      flash.now[:alert] = '編集失敗'
      render :edit
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
