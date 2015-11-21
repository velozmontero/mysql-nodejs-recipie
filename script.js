$(document).ready(function(){
    
    getInfo();
    
    $('#grade').change(getInfo);
    
    function getInfo(){
         $('#info').html("");
         var grade= $('#grade').val();
         $.ajax({

            url: "http://localhost:5238/transactions/"+grade,

            success: function(res){
                for (var x in res){
                    $('#info').append(
                        '<tr>'+'<td>'+res[x].sid+'</td>'+
                        '<td>'+res[x].fname+'</td>'+
                        '<td>'+res[x].lname+'</td>'+
                        '<td>'+res[x].donation.toFixed(2)+'</td>'+
                        '<td>'+res[x].grade+'</td>'+
                        '</tr>'
                    );
                    
                    console.log(res[0].donation);
                    console.log(res);
                }
            },
            error: function(request,errortype,errorMessage){
                console.log("it is not working");
            }
        });
     };
});