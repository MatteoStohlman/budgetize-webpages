export function deleteMapping(id){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=deleteMapping&mappingId='+id
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

export function addMapping(keyword,matchType,categoryId,userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=createMapping'
  requestUrl+='&keyword='+keyword
  requestUrl+='&matchType='+matchType
  requestUrl+='&category_id='+categoryId
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
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

export function getUserMappings(userId){
  var requestUrl='https://script.google.com/macros/s/AKfycbzyO8Lg1ciQYnhSV47k8aakSXAKSLC01v_yCZtV1FVYdjphKkM/exec?action=getUserMapping'
  requestUrl+='&userId='+(userId?userId:JSON.parse(localStorage.getItem('token')).userId)
  requestUrl+='&authorization='+JSON.parse(localStorage.getItem('token')).value
  console.log(requestUrl)
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
