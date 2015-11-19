$(document).ready(function(){
           
    getInfo();

    function getInfo(){

         $.ajax({

            url: "http://localhost:5238/transactions",

            success: function(res){
                for (var x in res){
                    $('#info').append(
                        '<tr>'+'<td>'+res[x].sid+'</td>'+
                        '<td>'+res[x].donation+'</td>'+
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