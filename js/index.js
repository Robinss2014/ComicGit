$(function(){
    $.post("/index/allstoryflow",
        function(storyflow){
            storyflow.arr.forEach(function(sf){
                $('#main').append('<div class="col-lg-3 col-md-4 col-xs-6 thumb">'+
                    '<a class="thumbnail" href="/storyflow/'+sf.name+'">'+'<img class="img-responsive" src="/storyflow/'+sf.name+'/'+sf.name+'.png" alt="">'+
                        sf.name+'</a></div>'
                );
        });
    });
});