var models  = require('../model');

insertConstantVal();
insertDefaultVal();

function insertConstantVal(){
    console.log("static insert");
    models.weekday.all().then(result => {   
        stat = result;
        if(stat.length == 0){
            //insert weekday
            models.weekday.create({
                name: 'Monday'
              });
              models.weekday.create({
                  name: 'Tuesday'
              });
              models.weekday.create({        
                  name: 'Wednesday'
              });
              models.weekday.create({        
                  name: 'Thursday'
              });
              models.weekday.create({        
                  name: 'Friday'
              });
              models.weekday.create({        
                  name: 'Saturday'
              });
              models.weekday.create({        
                  name: 'Sunday'
              });

              //insert status
              models.status.create({
                name: 'Upcoming',
                description: 'upcoming appointment'
              });
              models.status.create({
                  name: 'Approved',
                  description: 'Approved appoinment'
              });

              //insert roles
              models.role.create({
                name: 'Caregiver',
                description: 'Caregiver'
              });
              models.role.create({
                  name: 'Patient',
                  description: 'Patient'
              });
              models.role.create({
                  name: 'admin',
                  description: 'admin'
              });

              //insert services
              models.service.create({
                description: 'Bathing'
              });
              models.service.create({
                  description: 'Phisiotherapy'
              });
              models.service.create({        
                  description: 'Dressing'
              });
              models.service.create({        
                  description: 'Skin Care'
              });
              return;
          }
    })
}

function insertDefaultVal(){
    console.log("insert dynamic function");
    models.contact.all().then(result => {   
        stat = result;
        if(stat.length == 0){
            console.log("contact will be created");
            models.contact.create({
                home_phone: 123465789,
                work_phone: 123456789,
                social_security_number:123456789,
                address: '201 silver spring',
                address2: 'church road',
                city: 'Indore',
                pincode: 452010,
                state: 'NY',
                country: 'New York',
                emergency_contact: 132465798
           })
           .then(() => {
               console.log("then for contacts");
               models.user.create({
                    first_name: 'admin',
                    middle_name: 'admin',
                    last_name: 'admin',
                    display_name: 'admin',
                    dob: 1527186600000,
                    gender: 'Male',
                    primary_email: 'admin@gmail.com',
                    password_hash: '$2y$12$HDFgibfIQJsgcGBTmR/Y8ODWOPAMvRJfJxC63UB2zpgz8jqyx9H3q',
                    company_id: 1,
                    contact_id: 1
                })
            })
            .then(() => {
                console.log("third create");
                models.user_role.create({
                    user_id: 1,
                    role_id: 3
                })
                .catch(error => {
                    console.log(error);
                })
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            })
          }
          else{
             return; 
          }
    })
  }