import moment from 'moment'
export function getTransactions(userId,fromDate){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=getTransactions'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  if(fromDate)
    requestUrl+="&sinceDate="+moment(fromDate).format('YYYY-MM-DD')
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
export function ignoreTransaction(id,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=ignoreTransaction'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&id='+id
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
export function addNotes(id,notes,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=addNotesToTransaction'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&id='+id
  requestUrl+='&notes='+notes
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
export function splitTransaction(payload,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=splitTransaction'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&authorization='+JSON.parse(localStorage.getItem('token')).value
  return fetch(requestUrl,{
                            method: 'POST',
                            body:JSON.stringify(payload)
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
export function categorizeTransaction(transactionId,categoryId,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=categorizeTransaction'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&transactionId='+transactionId
  requestUrl+='&categoryId='+categoryId
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
