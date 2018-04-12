export function getPublicToken(accessToken){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+="action=getPublicToken"
  requestUrl+="&accessToken="+accessToken
  requestUrl+='&authorization='+JSON.parse(localStorage.getItem('token')).value
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

export function addBankAccount(public_token,accounts,institution,link_session_id,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+="action=addBankAccount"
  requestUrl+="&public_token="+public_token
  requestUrl+="&accounts="+JSON.stringify(accounts)
  requestUrl+="&institution="+JSON.stringify(institution)
  requestUrl+="&link_session_id="+link_session_id
  requestUrl+="&userId="+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&authorization='+JSON.parse(localStorage.getItem('token')).value
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

export function getBankAccounts(userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+="action=getAccounts"
  requestUrl+="&userId="+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&authorization='+JSON.parse(localStorage.getItem('token')).value
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
