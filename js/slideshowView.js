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
	$("#metadata")[0].innerHTML="nothing yet";
	$.ajax({
	    type:'GET',
	    url:panels.slice(0,index+1).join('/')+"/"+panels[index]+".txt",
	    //	    data{get_param
	    dataType:'text',
	    success:function(data){
		$("#metadata").empty();	
		$("#metadata")[0].innerHTML=data;
	    }
	});
	    
    }
    
    function display(panels){
        //$("#main").append("<div>"+panels.join('/')+"</div>");

        var index=2;



        var left=$('#left')[0];
        var right=$('#right')[0];

        chargeImg(index,panels);
        
        var intervalTime=$('#interval-time')[0];
        var time=10000;

        intervalTime.onchange=function(){
            time=this.value*1000;
            $('#interval-time-value')[0].innerHTML = this.value;
            clearInterval(interval);
            interval=setInterval(function(){
                if(index<panels.length-1){
                    index++;
                    chargeImg(index,panels)
                }
            },time);
        }
        
        var timerOn=true;
        var interval=setInterval(function(){
            if(index<panels.length-1){
                index++;
                chargeImg(index,panels)
            }
        },time);
        var timer=$('#timer')[0];
        timer.onclick=function(){
            if(timerOn){
                timerOn=false;
                clearInterval(interval);
                $("#timer").empty();
                $("#timer").html("start timer");
            }
            else{
                timerOn=true;
                $("#timer").empty();
                $("#timer").html("stop timer");
                interval=setInterval(function(){
                    if(index<panels.length-1){
                        index++;
                        chargeImg(index,panels)
                    }
                },time);
            }
        };

        right.onclick=function(){
            if(index<panels.length-1){
                index++;
                chargeImg(index,panels);
                if(timerOn){
                    clearInterval(interval);
                    interval=setInterval(function(){
                        if(index<panels.length-1){
                            index++;
                            chargeImg(index,panels)
                        }
                    },time);
                }
            }
        };

        left.onclick=function(){
            if(index>2){
                index--;
                chargeImg(index,panels);
                if(timerOn){
                    clearInterval(interval);
                    interval=setInterval(function(){
                        if(index<panels.length-1){
                            index++;
                            chargeImg(index,panels)
                        }
                    },time);
                }
            }
        };
        

    }
