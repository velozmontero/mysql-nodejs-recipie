$(document).ready(function(){
    
    getInfo();
    
    $('#grade').change(getInfo);
    $('#sections').change(getInfoBySection);

    function getInfo(){
        $('#sections').html("");
        var grade= $('#grade').val();
        getSection(grade);
         $('#info').html("");
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
    
    function getInfoBySection(){
        var sectionSelected= $('#sections').val();
        $.ajax({

            url: "http://localhost:5238/getsection/"+sectionSelected,
            
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
    }
    
    function getSection(grade){
         $.ajax({

            url: "http://localhost:5238/getgrade/"+grade,

            success: function(res){
                $('#sections').append('<option value="all" >All</option>');
                for (var x in res){
                    $('#sections').append( 
                        '<option value="'+res[x].section_id+'">'+res[x].section_id+' '+res[x].teacher_name+'</option>'
                    );
                  
                }
            },
            error: function(request,errortype,errorMessage){
                console.log("it is not working");
            }
        });
     };
});