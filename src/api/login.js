import moment from 'moment'
import {BACKEND_URL,API_KEY} from './const'
export function login(email,password){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=login'
  requestUrl+='&email='+email
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

export function loginV2(email,password){
  var requestUrl=BACKEND_URL+'/user/session'
  var payload = {
    email:email,
    password:password
  }
  return fetch(requestUrl,{
                            method: 'POST',
                            body:JSON.stringify(payload),
                            headers: {
                              'Content-Type': 'application/json',
                              'X-DreamFactory-API-Key':API_KEY
                            }
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
