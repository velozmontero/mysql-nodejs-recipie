$(document).ready(function(){
           
    $('#action').click(postInfo);
        
    function postInfo(){
         var sid= $('#studentId').val();
         var donation= $('#donation').val();
         console.log(donation + sid);
         $.ajax({
            url: "http://localhost:5238/transactions/"+sid+"/"+donation,
             
            type:"POST",
             
            success: function(res){
                $('#studentId').val('');
                $('#donation').val(''); 
                console.log(res);
            },
            error: function(request,errortype,errorMessage){
                console.log("it is not working");
            }
        });
     };
});