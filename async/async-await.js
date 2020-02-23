console.log('Before');

displayCommit();

console.log('After');


async function displayCommit(){
    try {
        const user = await getUser(1);
        const repos = await getRepository(user.gitHubUserName);
        const commits = await getCommits(repos.repo[4]);

        console.log(commits);
    }
    catch (err) {
        console.log(err.message);
    }
}


function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database.......');
    
            resolve({id: id, gitHubUserName: 'Nazmul24'});
            reject(new Error('Error on User!!'));
          }, 2000); 
    });

}

function getRepository(userName){

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github API...');
        
            resolve({username: userName, repo: ['Project-1', 'Project-2', 'Project-3', 'Project-4', 'Project-5', 'Project-6']});
            reject(new Error('Error on Repository!!'));
          }, 2000); 
    });
   
}


function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github commit API...'+repo);
        
            resolve(['Commit']);
            reject(new Error('Error on Commit!!'));
          }, 2000); 
    });

 
    
 }