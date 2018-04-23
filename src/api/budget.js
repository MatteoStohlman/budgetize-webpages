import moment from 'moment'
export function getUserBudget(userId,month,year){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=getUserBudget'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+="&month="+month
  requestUrl+="&year="+year
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

export function deleteBudgetLine(id){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=deleteBudgetLine&id='+id
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

export function addBudgetLine(month,year,value,categoryId,userId,budgetId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=addBudgetLine'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&month='+month
  requestUrl+='&year='+year
  requestUrl+='&value='+value
  requestUrl+='&categoryId='+categoryId
  if(budgetId)requestUrl+='&budgetId='+budgetId
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
export function copyBudget(payload,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?'
  requestUrl+='action=copyBudget'
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
