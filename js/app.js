let searchinput=document.getElementById('search');
const table= document.getElementById('maintable');
const table2= document.getElementById('repositorytable');
const token = '1405a0218141e153f0587876136146a4e8dfe605';

searchinput.addEventListener('keyup', function(e){
    let valuetosearch=document.getElementById('search').value;
    if(valuetosearch===""){
      $("#maintable td").remove();
      $("#repositorytable td").remove();
      document.getElementById('alert').innerHTML="Please complete the textboxt with a github username";
      document.getElementById('stars').innerHTML="";

    }else{
        
    let  apiRequest1 =  fetch(`https://api.github.com/users/${valuetosearch}`, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`
        }
      }).then(function(response){ 
        if(response.ok)
        {
          return   response.json()
        }
            
        
    })
    .then(function(myJson) {
      $("#maintable td").remove();
      table.innerHTML+=`<tr><td><img style="width=144px; height: 144px;" src='${myJson.avatar_url}'></td><td>${myJson.name}</td><td>${myJson.followers}</td><td>${myJson.following}</td><td>${myJson.company}</td><td>${myJson.blog}</td><td>${myJson.location}</td><td>${myJson.created_at}</td><td><a href="${myJson.html_url}" target="_blank">Profile</a> </td></tr>`;
      document.getElementById('alert').innerHTML="";
    }).catch(function(error) {
      document.getElementById('stars').innerHTML="";
      document.getElementById('alert').innerHTML="User Not Found";

      console.clear();
      
    });
      
    let apiRequest2 = fetch(`https://api.github.com/users/${valuetosearch}/repos`, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`
        }
      }).then(function(response){
        if(response.ok)
        {
         return response.json()
        }
    })
    .then(function(myJson) {
      $("#repositorytable td").remove();
      document.getElementById('alert').innerHTML="";
      myJson.forEach(function(post){
        table2.innerHTML+=`<tr><td>${post.name}</td><td>${post.stargazers_count}</td><td>${post.forks}</td><td>${post.watchers_count}</td><td><a href="${post.html_url}" target="_blank">Go to the Repository</a> </td></tr>`;
       });
      
    }).catch(function(error) {
      document.getElementById('stars').innerHTML="";
      document.getElementById('alert').innerHTML="User Not Found";

      console.clear();
    });

    let apiRequest3 = fetch(`https://api.github.com/users/${valuetosearch}/starred`, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`
        }
      }).then(function(response){ 
        if(response.ok)
        {
            return response.json()
        }
    })
    .then(function(myJson) {
      document.getElementById('alert').innerHTML="";
      if(myJson.length===0){
       document.getElementById('stars').innerHTML=`N° </i><i class="fa fa-star" aria-hidden="true"></i>: 0`;


     }else{
        document.getElementById('stars').innerHTML=`N° </i><i class="fa fa-star" aria-hidden="true"></i>: ${myJson.length}`;
   
      }
      
    }).catch(function(error) {
      document.getElementById('stars').innerHTML="";
      document.getElementById('alert').innerHTML="User Not Found";

      console.clear();
    });
    

    let combinedData = {'apiRequest1':{},'apiRequest2':{}};
    Promise.all([apiRequest1,apiRequest2]).then(function(values){
    combinedData["apiRequest1"] = values[0];
    combinedData["apiRequest2"] = values[1];
    combinedData["apiRequest3"] = values[2];
    return combinedData;
    
    });

    
}
});




