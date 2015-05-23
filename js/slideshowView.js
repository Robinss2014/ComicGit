/**
 * @file slideshowView.js
 * @author Sisi Wei, 915565877
 * @date 23 May 15
 * @description A javascript for the slideshowView
 */
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

    /**
     * Request the images for the slidsshow
     * @param index the indec for the current panel
     * @param panels the panels in the storyflow
     */
    function chargeImg(index,panels){
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
    
    /**
     * Display the panels
     * @param panels the panels in the storyflow
     */
    function display(panels){
        var index=2;

        var left=$('#left')[0];
        var right=$('#right')[0];

        chargeImg(index,panels);
        
        var intervalTime=$('#interval-time')[0];
        var time=10000;

        // listen to the system's time
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

        //set time control for the slide show
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

        // go to the next image
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

        // go to the previous image
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
