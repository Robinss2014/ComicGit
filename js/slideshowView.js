$(document).ready(function(){

    var u=$(location).attr('href').split('/');
    if(u[u.length-1]===""){
        u=u.slice(0,u.length-1);
    }
    var i =0;
    while(u[i]!="slideshow"){
        i++;
    }

    u=u.slice(i+1,u.length);
    $('#backstoryflow')[0].href="/storyflow/"+u[0];
    panels="";
    $.ajax({
        type: 'GET',
        url: '/panel/pathpanel/'+u[0]+'/'+u[1],
        data: { get_param: 'path' },
        dataType:'json',
        success: function (data) {
            panels=data.path.split('/');
            display(panels);
        }
    });


});
function chargeImg(index,panels){
//      $("#main").append("<div>panel src : "+panels.slice(0,index+1).join('/')+"/"+panels[index]+"</div>");
    $("#slide")[0].src=panels.slice(0,index+1).join('/')+"/"+panels[index]+".png";
}

function display(panels){
    //$("#main").append("<div>"+panels.join('/')+"</div>");

    var index=2;



    var left=$('#left')[0];
    var right=$('#right')[0];

    chargeImg(index,panels);
    
    right.onclick=function(){
        if(index<panels.length-1){
            index++;
            chargeImg(index,panels);
        }
    };
    left.onclick=function(){
        if(index>2){
            index--;
            chargeImg(index,panels);
       }
    };
}