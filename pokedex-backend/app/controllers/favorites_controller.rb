class FavoritesController < ApplicationController
    def create
        @favorite = Favorite.create(
            user: params[:user_id],
            pokemon_id: params[:pokemon_id]
        )
    end
end