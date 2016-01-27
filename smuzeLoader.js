   /*
    SMUZELOADER.JS
    */

   var smuzeParams = {
        spinnerClass : "",
        backgroundClass : "",
        shadow: false,
        removeOnClick : false
    }
    var smuzeStyle = {
        setStyle: function(rule, target){
            addStyle = false
            var style = document.createElement('style');
            style.type = 'text/css';
            switch(target){
                case "spinner":
                    addStyle = true
                    style.innerHTML = '.customSmuzeLoaderSpinner_2 { border-bottom-color: '+rule+' !important; border-left-color: '+rule+' !important; }\
                                       .customSmuzeLoaderSpinner_1 { border-top-color: '+rule+' !important; border-right-color: '+rule+' !important; }';
                    smuzeParams.spinnerClass = "customSmuzeLoaderSpinner"
                break;
                case "shadow":
                    smuzeParams.shadow = (rule === true? true : false)
                break;

                case "removeOnClick":
                    smuzeParams.removeOnClick = (rule === true? true : false)
                break;

                case "background":
                    style.innerHTML = '.customSmuzeLoaderBackground { background: '+rule+' !important; }';
                    smuzeParams.backgroundClass = "customSmuzeLoaderBackground"
                    addStyle = true
                break;
            }
            if(addStyle == true && rule != ""){
                document.getElementsByTagName('head')[0].appendChild(style);              
            }
            else{
                // console.log("Target Error.")
            }
        }
    }
    var smuzeLoader = {
      wait : function(milisec, callback){
        setTimeout(function(){
            callback() 
        }, milisec);
      },
      params: function(params) {
        if (typeof params.backgroundColor != 'undefined') {
          smuzeStyle.setStyle(params.backgroundColor , "background")
        }
        if (typeof params.spinnerColor != 'undefined') {
          smuzeStyle.setStyle(params.spinnerColor , "spinner")
        }
        if (typeof params.shadow != 'undefined') {
          smuzeStyle.setStyle(params.shadow , "shadow")
        }
        if (typeof params.removeOnClick != 'undefined') {
          smuzeStyle.setStyle(params.removeOnClick , "removeOnClick")
        }
      },
      show: function(params,callback){


        params = (params === true ?{"removeOnClick":true}:(params || {}))

        $(".smuze_loader_overlay").remove()
        var div = document.createElement('div');
        var container = document.createElement('div');
        container.classList.add("smuze_loader_container");

        div.classList.add("smuze_loader_overlay");
        if(smuzeParams.backgroundClass != ""){
            div.classList.add(smuzeParams.backgroundClass);
        }
        
        div.scrolling="no";
        container.scrolling="no";
        div.id="";
        shadowMarkup = ""
        if(smuzeParams.shadow){
            shadowMarkup = "<div class=\"smuze_spinner_shad\"></div>";
        }
        content = "<div class=\"smuze_loader\">"+shadowMarkup+"<div class=\"smuze_spinner smuze_spinner_1 "+smuzeParams.spinnerClass+"_1\"></div><div class=\"smuze_spinner smuze_spinner_2 "+smuzeParams.spinnerClass+"_2\"></div></div>"
        $(container).append(content)
        $(div).append(container)
        $("body").append(div)
        $(".smuze_loader_overlay").fadeIn(100, function(){
            $(".smuze_loader").fadeIn()
        })
        if((smuzeParams.removeOnClick && typeof params.removeOnClick == 'undefined') || (params.removeOnClick === true)){
            $(".smuze_loader_overlay").click(function() {
              smuzeLoader.hide()
            });
        }

        if(typeof callback == "function") 
            callback(); 
      },
      hide: function(callback){
        $(".smuze_loader_overlay").fadeOut(100, function(){
            $(".smuze_loader_overlay").remove()
        })
      },
      hideAfter: function(milisec, callback){
        smuzeLoader.wait(milisec, function(){
            smuzeLoader.hide(function(){
                if(typeof callback == "function") 
                callback();
            })
        })
      },
      showAfter: function(milisec, params, callback){
        smuzeLoader.wait(milisec, function(){
            smuzeLoader.show(params,function(){
                if(typeof callback == "function") 
                callback();
            })
        })
      },
      done: function(autohide, callback){
        
        function proceed(){
            autohide = autohide || false
            if(autohide){
                smuzeLoader.wait(1500,function(){
                    $(".smuze_loader").fadeOut(200, function(){
                        smuzeLoader.hide(function(){
                           if(typeof callback == "function") 
                           callback() 
                        })
                    })
                })
            }
            else{
                if(typeof callback == "function") 
                callback() 
            }
        }

        $(".smuze_spinner_2").replaceWith("<div class='smuze_spinner smuze_spinner_2_speed spin_fast_as_hell'></div>")
        $(".smuze_spinner_1").replaceWith("<div class='smuze_spinner smuze_spinner_1_speed spin_fast_as_hell'></div>")
        
        smuzeLoader.wait(300, function(){
            $(".smuze_spinner_2_speed").css("border-left-color", "rgba(0, 0, 0, 0.2)");

            smuzeLoader.wait(200, function(){
                $(".smuze_spinner_2_speed").css("border-bottom-color", "rgba(0, 0, 0, 0.2)");

                smuzeLoader.wait(200, function(){
                    smuzeLoader.wait(100, function(){
                       $(".smuze_spinner_1_speed").css("border-top-color", "rgba(0, 0, 0, 0.3)");
                       smuzeLoader.wait(200, function(){
                           $(".smuze_spinner_1_speed").css("border-right-color", "rgba(0, 0, 0, 0.3)");
                           smuzeLoader.wait(200, function(){
                               $(".smuze_loader").append("<div class=\"smuze_confirm smuze_confirm_mark\"><label></label></div>")
                               $(".smuze_spinner_2_speed").css("background-color", "rgba(86, 183, 83, 0.39)");
                               proceed()
                           }) 
                       }) 
                    }) 
                })
                
            })
        })
      }

  }
