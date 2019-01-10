FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/image/googlelogo_color_272x92dp.png")
    user
    group
  end
end
