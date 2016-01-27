   /*
    SMUZELOADER.JS
    */

   var smuzeParams = {
        spinnerClass : "",
        backgroundClass : "",
        shadow: false,
        removeOnClick : false,
        target: "",
        successColor : "rgba(86, 183, 83, 0.78)",
        errorColor : "rgba(183, 75, 59, 0.78)",
        warningColor : "rgba(206, 183, 36, 0.78)"
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

                case "target":
                    smuzeParams.target = rule
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
        if (typeof params.target != 'undefined') {
          smuzeStyle.setStyle(params.target , "target")
        }
      },
      show: function(params,callback){

        if(typeof params == "object"){
          smuzeLoader.params(params)
        }else{
          params = (params === true ?{"removeOnClick":true}:(params || {}))
        }
        


        
        var div = document.createElement('div');
        var container = document.createElement('div');
        container.classList.add("smuze_loader_container");
        container.classList.add("no_select");
        var target = ".smuze_loader_overlay"
        var mainTarget= "body"
        if(smuzeParams.target != "" && $(smuzeParams.target).length > 0){
          div.classList.add("smuze_loader_overlay_target");
          div.classList.add("no_select");
          target = ".smuze_loader_overlay_target"
          mainTarget = smuzeParams.target
        }
        else{
          div.classList.add("smuze_loader_overlay");
        }
        $(".smuze_loader_overlay_target").remove()
        $(".smuze_loader_overlay").remove()
        
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
        content = "<div class=\"smuze_loader\">"+shadowMarkup+"<div id=\"smuze_spinner_1\" class=\"smuze_spinner smuze_spinner_1 "+smuzeParams.spinnerClass+"_1\"></div><div id=\"smuze_spinner_2\" class=\"smuze_spinner smuze_spinner_2 "+smuzeParams.spinnerClass+"_2\"></div></div>"
        $(container).append(content)
        $(div).append(container)
        $(mainTarget).append(div)
        $(target).fadeIn(100, function(){
            $(".smuze_loader").fadeIn()
        })
        if((smuzeParams.removeOnClick && typeof params.removeOnClick == 'undefined') || (params.removeOnClick === true)){
            $(target).click(function() {
              smuzeLoader.hide()
            });
        }

        if(typeof callback == "function") 
            callback(); 
      },
      hide: function(callback){
        $(".smuze_loader_overlay_target").fadeOut(100, function(){
            $(".smuze_loader_overlay_target").remove()
        })

        $(".smuze_loader_overlay").fadeOut(100, function(){
            $(".smuze_loader_overlay").remove()
        })
        if(typeof callback == "function") 
                callback();
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
      done: function(type, autohide, callback){
        
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

        $("#smuze_spinner_2").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          console.log("hej")
        });
        $("#smuze_spinner_2").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(){
          console.log("hej")
        });

        $("#smuze_spinner_2").one("webkitTransformationEnd otransformationend oTransformationEnd msTransformationEnd transformationend", function(){
          console.log("hej")
        });
        

        $("#smuze_spinner_1").fadeOut(200, function(){
          $(".smuze_spinner_1").replaceWith("<div class='smuze_spinner smuze_spinner_1_speed spin_fast_as_hell'></div>")
        })
        $("#smuze_spinner_2").fadeOut(200, function(){
          $(".smuze_spinner_2").replaceWith("<div class='smuze_spinner smuze_spinner_2_speed spin_fast_as_hell'></div>")
          $(".smuze_spinner_2_speed").css("border", "5px solid rgba(0, 0, 0, 0.2)");

          $(".smuze_spinner_2_speed").fadeIn(100)
          $(".smuze_spinner_1_speed").fadeIn(100)


          smuzeLoader.wait(300, function(){
            



            smuzeLoader.wait(200, function(){

              switch(type){
                case "success":
                    $(".smuze_loader").append("<div class=\"smuze_confirm smuze_confirm_mark\"><label></label></div>")
                    $(".smuze_spinner_2_speed").css("background-color", smuzeParams.successColor);
                break;

                case "warning":
                    $(".smuze_loader").append("<div class=\"smuze_warning\"><label>!</label></div>")
                    $(".smuze_spinner_2_speed").css("background-color", smuzeParams.warningColor);
                break;

                case "error":
                    $(".smuze_loader").append("<div class=\"smuze_error\"><label>!</label></div>")
                    $(".smuze_spinner_2_speed").css("background-color", smuzeParams.errorColor);
                break;


                default:
                    $(".smuze_loader").append("<div class=\"smuze_confirm smuze_confirm_mark\"><label></label></div>")
                    $(".smuze_spinner_2_speed").css("background-color", smuzeParams.successColor);
                break;
              }


               
               $(".smuze_spinner_1_speed").fadeOut(100)
               proceed()
            }) 

            // smuzeLoader.wait(200, function(){
            //     $(".smuze_spinner_2_speed").css("border-bottom-color", "rgba(0, 0, 0, 0.2)");

            //     smuzeLoader.wait(200, function(){
            //         smuzeLoader.wait(100, function(){
            //            $(".smuze_spinner_1_speed").css("border-top-color", "rgba(0, 0, 0, 0.3)");
            //            smuzeLoader.wait(200, function(){
            //                $(".smuze_spinner_1_speed").css("border-right-color", "rgba(0, 0, 0, 0.3)");
            //                smuzeLoader.wait(200, function(){
            //                    $(".smuze_loader").append("<div class=\"smuze_confirm smuze_confirm_mark\"><label></label></div>")
            //                    $(".smuze_spinner_2_speed").css("background-color", "rgba(86, 183, 83, 0.39)");
            //                    proceed()
            //                }) 
            //            }) 
            //         }) 
            //     })
                
            // })
          })
        })
        
        

      },
      pause: function(){
        spinner1 = document.getElementById("smuze_spinner_1");
        spinner2 = document.getElementById("smuze_spinner_1");

        $("#smuze_spinner_1").css("animation-play-state", "paused")
        $("#smuze_spinner_1").css("-webkit-animation-play-state", "paused")

        $("#smuze_spinner_2").css("animation-play-state", "paused")
        $("#smuze_spinner_2").css("-webkit-animation-play-state", "paused").css("animation", "rotate 1s ease").css("-webkit-animation-play-state", "running")

        $("#smuze_spinner_2")
        $("#smuze_spinner_2").css("animation", "rotate 1s ease")




        // style.webkitAnimationPlayState = 'paused';
            document.body.className = 'paused';
      }
      


  }
