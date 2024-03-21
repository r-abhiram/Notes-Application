class Api::V1::NotesController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery prepend: true
  def index
    @notes = Note.all
    render json: @notes, status: :ok
  end

  def create
    @note = Note.new(note_params)
    puts note_params
    if @note.save
      render json: {data: @note, success: true}, status: :ok
    else
      render json: {data: @note.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
    end

  end

  def show
    begin
      @note = Note.find(params[:id])
      render json: {data: @note, success: true}, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: {data: "Note not found", success: false}, status: :not_found
    end
  end

  def update
    begin
      @note = Note.find(params[:id])
      @note.content = updated_content
      @note.save
      render json: {data: @note, success: true}, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: {data: "Note not found", success: false}, status: :not_found
    end 
  end

  def destroy
    begin
      @note = Note.find(params[:id])
      @note.destroy
      render json: {data: "Note deleted successfully", success: true}, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: {data: "Note not found", success: false}, status: :not_found
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :img)
  end

  def updated_content
    params.require(:content)
  end
end
