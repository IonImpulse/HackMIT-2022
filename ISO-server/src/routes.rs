use crate::*;
use ::serde::{Deserialize, Serialize};
use actix_web::error::*;
use serde_json::json;
use crate::data::*;


#[get("/api/v1/posts/feedPage/{index}")]
pub async fn get_post_page(
    index: web::Path<usize>,
) -> Result<HttpResponse, Error> {
    let data = db_clone().await;

    let page = data.get_feed_page(*index);

    if page.is_err() {
        let json = json!({
            "error": page.err().unwrap()
        });

        return Ok(HttpResponse::BadRequest().json(json));
    } else {
        let index_to_return: Option<usize> = if *index + FEED_PAGE_SIZE < data.feed.len() {
            Some(*index + FEED_PAGE_SIZE)
        } else {
            None
        };
        let json = json!({
            "results": page.unwrap(),
            "next": index_to_return,
        });

        return Ok(HttpResponse::Ok().json(json));
    }
}

#[get("/api/v1/users/userInfo")]
pub async fn get_user_info(
    user: web::Json<User>,
) -> Result<HttpResponse, Error> {
    let data = db_clone().await;

    let user = data.get_user_by_uuid(&user.uuid);

    if user.is_err() {
        let json = json!({
            "error": user.err().unwrap()
        });


        return Ok(HttpResponse::BadRequest().json(json));
    } else {
        let json = json!({
            "results": user.unwrap(),
        });

        return Ok(HttpResponse::Ok().json(json));
    }
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub struct NewPost {
    post_type: PostType, owner_uuid: String, time_type: TimeType, tags: Vec<String>
}

#[post("/api/v1/posts/new")] 
pub async fn new_post(
    post: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    let post = post.into_inner();

    let mut db = db_mut().await;

    db.add_post(post.post_type, post.owner_uuid, post.time_type, post.tags).await;

    drop(db);

    Ok(HttpResponse::Ok().finish())
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub struct VerifyJSON {
    pub phone_number: String,
    pub country: String,
}

#[post("/api/v1/users/startVerification")]
pub async fn start_verification(
    data: web::Json<VerifyJSON>,
) -> Result<HttpResponse, Error> {

    let data = data.into_inner();

    let result = User::start_verification(data.phone_number, data.country).await;

    if result.is_ok() {
        let json = json!({
            "results": result.unwrap(),
        });

        return Ok(HttpResponse::Ok().json(json));
    } else {
        let json = json!({
            "error": result.err().unwrap(),
        });

        return Ok(HttpResponse::BadRequest().json(json));
    }
}

#[derive(Default, Deserialize, Serialize, Clone)]
pub struct VerifyCodeJSON {
    pub uuid: String,
    pub code: String,
}
#[post("/api/v1/users/checkVerification/")]
pub async fn check_verification(
    data: web::Json<VerifyCodeJSON>,
) -> Result<HttpResponse, Error> {

    let data = data.into_inner();

    let mut db = db_mut().await;

    let result = db.check_verification(data.uuid, data.code).await;

    if result.is_ok() {
        let json = json!({
            "results": result.unwrap(),
        });

        return Ok(HttpResponse::Ok().json(json));
    } else {
        let json = json!({
            "error": result.err().unwrap(),
        });

        return Ok(HttpResponse::BadRequest().json(json));
    }
}