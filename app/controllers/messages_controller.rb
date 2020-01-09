class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) #指定されたグループに紐づいたメーセージ群とユーザー情報を代入
  end

  def create
    @message = @group.messages.new(message_params) #指定されたグループ
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params 
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id) #箱
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
