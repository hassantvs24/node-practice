console.log('Before');

    getUser(1, (result) => {
        console.log(result);

        getRepository(result.gitHubUserName, (res) => {
            console.log(res);

                getCommits(res.repo[5], (commit) => {
                    console.log(commit);
                });

        });

    });
 

console.log('After');

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading user from database.......');

        callback({id: id, gitHubUserName: 'Nazmul24'});
      }, 2000); 
}

function getRepository(userName, callback){
   setTimeout(() => {
    console.log('Calling github API...');

    callback({username: userName, repo: ['Project-1', 'Project-2', 'Project-3', 'Project-4', 'Project-5', 'Project-6']});
  }, 2000); 

   
}


function getCommits(repo, callback){
    setTimeout(() => {
     console.log('Calling github commit API...'+repo);
 
     callback(['Commit']);
   }, 2000); 
 
    
 }