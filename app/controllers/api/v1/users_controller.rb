class Api::V1::UsersController < ApplicationController
    protect_from_forgery with: :null_session
    protect_from_forgery prepend: true

    # skip_before_action :require_login, only: [:login, :auto_login]

    def create
        @user = User.new(user_params)
        if @user.save
            # payload = {user_id: @user.id}
            # token = encode_token(payload)
            render json: {data: @user, success: true}, status: :ok
        else
            render json: {data: @user.errors.full_messages, success: false}, status: :unprocessable_entity
        end
    end

    def login
        @user = User.find_by(email: params["email"]).try(:authenticate, params["password"])
        if @user
            # payload = {user_id: @user.id}
            # token = encode_token(payload)
            render json: {data: @user, success: true}, status: :ok
        else
            render json: {data: "Invalid crendentials", success: false}, status: :unprocessable_entity
        end
    end

    # def auto_login
    #     if session_user
    #         render json: {data: session_user}, status: :ok
    #     else
    #         render json: {data: "No user logged in"}, status: 404
    #     end
    # end

    # def check
    #     puts ("hello #{session[:user_id]}")
    #     if session[:user_id]
    #         @user = User.find(session[:user_id])
    #         render json: {data: @user, success: true}, status: :ok
    #     else
    #         render json: {data: "User not loggedin", success: false}, status: 404
    #     end
    # end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation)
    end
end
