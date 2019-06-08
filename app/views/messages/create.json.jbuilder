json.body @message.body
json.image @message.image
json.created_at format_posted_time(@message.created_at)
json.name @message.user.name
json.id @message.id
