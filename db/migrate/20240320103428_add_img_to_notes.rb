class AddImgToNotes < ActiveRecord::Migration[7.1]
  def change
    add_column :notes, :img, :string
  end
end
