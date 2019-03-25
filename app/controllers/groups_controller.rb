class GroupsController < ApplicationController

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.permit(:name)
  end
end
