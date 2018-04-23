import moment from 'moment'
export function createAccount(email,password,firstName,lastName){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=createUser'
  requestUrl+='&email='+email
  requestUrl+='&firstName='+firstName
  requestUrl+='&lastName='+lastName
  requestUrl+='&password='+password
  return fetch(requestUrl,{
                            method: 'GET',
                          })
          .then(response => {
            if (!response.ok) {
              const error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
            return response.json();
          });
}
