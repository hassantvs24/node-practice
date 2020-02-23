checkEmail();

async function checkEmail(){
    try {
        const customers = await customer(1);
        const movies = await create_email(customers.cName);
        const email = await send_email(movies.cName);

        console.log(email);
    }
    catch (err) {
        console.log(err.message);
    }
}


function customer(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Finding customer from database.......');
    
            resolve({id: id, cName: 'Nazmul Hossain', isGold: true});
            reject(new Error('Error on Finding Customer!!'));
          }, 2000); 
    });
}


function create_email(customerName){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Finding movies from database.......');
    
            resolve({cName: customerName, movies: ['Home Alone', 'Mr. Been', 'The Super Men']});
            reject(new Error('Error on Finding Movies!!'));
          }, 2000); 
    });
}


function send_email(customerName){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Sending email to customer.......');
    
            resolve('Email sended to '+customerName);
            reject(new Error('Error on sending email!!'));
          }, 2000); 
    });
}

