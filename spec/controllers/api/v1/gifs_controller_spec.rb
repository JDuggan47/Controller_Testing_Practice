require 'rails_helper'

RSpec.describe Api::V1::GifsController, type: :controller do
  let!(:first_gif) {Gif.create(name: 'Hello this is Dog', url: "https://media.giphy.com/media/pSpmpxFxFwDpC/giphy.gif", likes: 25)}
  let!(:second_gif) { Gif.create(name: "Pug Swimming", url: "https://media.giphy.com/media/r6ALgGVKLg93O/giphy.gif", likes: 47) }

  describe 'GET#index' do
    it 'should return a list of all the gifs' do
      get :index

      returned_json = JSON.parse(response.body)
    end
  end

  describe "GET#index" do
  it "should return a list of all the gifs ordered by likes" do

    get :index
    returned_json = JSON.parse(response.body)

    expect(response.status).to eq 200
    expect(response.content_type).to eq("application/json")

    expect(returned_json.length).to eq 2
    expect(returned_json[0]["name"]).to eq "Pug Swimming"
    expect(returned_json[0]["url"]).to eq "https://media.giphy.com/media/r6ALgGVKLg93O/giphy.gif"

    expect(returned_json[1]["name"]).to eq "Hello this is Dog"
    expect(returned_json[1]["url"]).to eq "https://media.giphy.com/media/pSpmpxFxFwDpC/giphy.gif"

  end
end

describe 'POST#create' do
  it 'creates a new GIF' do
    post_json = { name: "Basset Hound Shakes Off", url: "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif" }.to_json

    expect{ post(:create, post_json)}.to change{ Gif.count }.by 1
  end
end

it "returns the json of the newly posted gif" do
    post_json = { name: "Basset Hound Shakes Off", url: "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif" }.to_json

    post(:create, post_json)
    returned_json = JSON.parse(response.body)
    expect(response.status).to eq 200
    expect(response.content_type).to eq("application/json")

    expect(returned_json).to be_kind_of(Hash)
    expect(returned_json).to_not be_kind_of(Array)
    expect(returned_json["name"]).to eq "Basset Hound Shakes Off"
    expect(returned_json["url"]).to eq "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif"
  end


end
