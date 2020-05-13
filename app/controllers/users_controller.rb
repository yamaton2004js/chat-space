class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.json
    end
  end

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
