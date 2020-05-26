export function handleLogout() {  
    try {
        //Auth.signOut is currently broken and does not support non-global sign outs, therefore I had to hack in my solution.
        // await Auth.signOut();
        for (let key in localStorage) {
          if (key.substring(0,30) === 'CognitoIdentityServiceProvider') {
            localStorage.removeItem(key);
          }
        }
        window.location =""


      } catch (e) {
        alert(e.message);
      }
    }
