# README

## messages テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|---|
|body|text|---|
|image|string|---|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|create_at|timestamps|---|

### Association
- belongs_to :user
- belongs_to :group

## users テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|---|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true, add_index|
|password|string|null: false, unique: true, add_index|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## groups テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|---|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## group_users テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|---|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
