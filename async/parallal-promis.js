const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asunc Oparation...1');
        resolve(1);
        //reject(new Error('Something error on p1'));
    }, 2000); 
});

const p2 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Asunc Oparation...2');
        resolve(2);
    }, 2000); 
});

//Promise.all([p1,p2]).then(result => console.log(result)).catch(err => console.log(err.message));
Promise.race([p1,p2]).then(result => console.log(result)).catch(err => console.log(err.message));

 