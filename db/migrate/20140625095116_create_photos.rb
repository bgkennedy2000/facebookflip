class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :image_url
      t.integer :user_id

      t.timestamps
    end
  end
end
