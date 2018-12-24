# DB design

## messages

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|user_id|integer|null: false|
|group_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :group

## users

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

### Association
- has_many :messages
- has_many :relations
- has_many :groups, through :relations

## groups

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :relations
- has_many :users, through :relations

## relations

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, index: true, foreign_key: true
|group|references|null: false, index: true, foreign_key: true

### Association

- belongs_to :user
- belongs_to :group
