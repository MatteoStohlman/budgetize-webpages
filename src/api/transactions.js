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
