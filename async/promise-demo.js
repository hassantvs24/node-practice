console.log('Before');

    //const p = Promise.resolve({id:1, user:'Kuddus'}); //Shortcut of promise resolve
    //const p = Promise.reject(new Error('Rejected this!!')); //Shortcut of promise reject
    
    //p.then(result => console.log(result));
    //p.catch(err => console.log(err));


getUser(1)
    .then(result => getRepository(result.gitHubUserName))
    .then(res => getCommits(res.repo[5]))
    .then(commit => console.log(commit))
    .catch(err => console.log(err));
 

console.log('After');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database.......');
    
            resolve({id: id, gitHubUserName: 'Nazmul24'});
            reject(new Error('Error on User!!'));
          }, 2000); 
    })

}

function getRepository(userName){

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github API...');
        
            resolve({username: userName, repo: ['Project-1', 'Project-2', 'Project-3', 'Project-4', 'Project-5', 'Project-6']});
            reject(new Error('Error on Repository!!'));
          }, 2000); 
    })
   
}


function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github commit API...'+repo);
        
            resolve(['Commit']);
            reject(new Error('Error on Commit!!'));
          }, 2000); 
    })

 
    
 }