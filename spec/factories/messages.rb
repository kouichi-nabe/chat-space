FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/app/assets/images/sample_image.jpg")}
    user
    group
  end
end
