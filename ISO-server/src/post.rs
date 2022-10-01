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

    pub time_posted: u32,
    pub time_expires: u32,
    pub time_accepted: Option<u32>,

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
}