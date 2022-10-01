use phonenumber::*;

use crate::post::Post;

/// User data
pub struct User {
    pub uuid: String,
    /// E.164 phone number
    phone_number: String,
    current_location: (f64, f64),
    karma: i32,
    posts: Vec<Post>,
}

impl User {
    /// Create a new user
    pub fn new(uuid: String, phone_number: String, country: String) -> Result<User, String> {
        let id: Option<phonenumber::country::Id> = country.parse().ok();

        let number = phonenumber::parse(id, phone_number);

        if number.is_err() {
            return Err("Error parsing phone number".to_string());
        }

        let number = number.unwrap();

	    let valid  = phonenumber::is_valid(&number);

        if !valid {
            return Err("Invalid phone number".to_string());
        }

        Ok(User {
            uuid,
            phone_number: number.format().mode(Mode::E164).to_string(),
            current_location: (0.0, 0.0),
            karma: 0,
            posts: Vec::new(),
        })
    }
}