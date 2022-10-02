use std::time::SystemTime;

use phonenumber::country::Id::SY;
use ::serde::{Deserialize, Serialize};


#[derive(Default, Deserialize, Serialize, Clone)]
pub enum PostType {
    #[default] ISO,
    OSI,
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub enum PostState {
    #[default] Draft,
    Posted,
    Accepted,
    Expired,
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub enum TimeType {
    ServiceNow,
    ServiceFuture,
    #[default] ItemPermanant,
    ItemLoan,
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub struct Post {
    pub uuid: String,
    pub iso_or_osi: PostType,
    pub state: PostState,

    pub time_posted: u64,
    pub time_expires: u64,
    pub time_accepted: Option<u64>,

    user_owner: String,
    user_acceptor: Option<String>,

    karma_diff: i32,

    views: u64,

    time_type: TimeType,
    tags: Vec<String>,
}

impl Post {
    pub fn get_owner(&self) -> String {
        self.user_owner.clone()
    }

    pub fn new(post_type: PostType, owner_uuid: String, time_type: TimeType, tags: Vec<String>) -> Post {
        let mut post = Post::default();

        post.uuid = uuid::Uuid::new_v4().to_string();
        post.iso_or_osi = post_type;
        post.state = PostState::Draft;
        // now
        post.time_posted = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();
        // in 24 hours
        post.time_expires = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs() + 86400;
        post.time_accepted = None;
        post.user_owner = owner_uuid;
        post.user_acceptor = None;
        post.karma_diff = -1;
        post.views = 0;
        post.time_type = time_type;
        post.tags = tags;

        post
    }
}