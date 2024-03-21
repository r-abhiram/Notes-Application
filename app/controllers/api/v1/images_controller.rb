class Api::V1::ImagesController < ApplicationController
    
    def generate_presigned_url
        object_key = "#{SecureRandom.uuid}"
        presigner = Aws::S3::Presigner.new(client: S3_BUCKET.client)
        presigned_url = presigner.presigned_url(:put_object, bucket: S3_BUCKET.name, key: object_key, expires_in: 3600)

        render json: {presigned_url: presigned_url}
    end

end
