
pub enum PostType {
    ISO,
    OSI,
}

pub enum PostState {
    Draft,
    Posted,
    Accepted,
    Expired,
}

pub enum TimeType {
    ServiceNow,
    ServiceFuture,
    ItemPermanant,
    ItemLoan,
}

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