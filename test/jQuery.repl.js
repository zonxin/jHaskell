(function($){
    function print(classname,message){
        var body = $('body');
        var p = $('<p class= "repl-' + classname +'"></p>');
        p.text(message);
        this.append(p);
        return body.scrollTop(body.attr('scrollHeight'));
    }
    $.fn.repl = function(options){
        options = $.extend({
            prompt: "root@localhost:~$",
            startMessage: "# jQuery repl",
            loop: function(x,fn){ fn(x); }
        },options);

        var input = $(this),
            repl_console= $('<div class="repl-console"></div>'),
            prompt = $('<span class="repl-prompt">' + options.prompt + '</span>');
        input.addClass("repl-active");
        input.before(repl_console);
        input.before(prompt);
        if(options.startMessage) { 
            print.call(repl_console,"stdout",options.startMessage);
        }
        input.parent('form').submit(function(){ 
            var line = input.val();
            print.call(repl_console,"stdin",options.prompt + line);
            options.loop.call(null,line,function(output){
                print.call(repl_console,"stdout",output);
            });
            input.val("");
            input.focus();
            return false; 
        });
        input.focus();
    };
})(jQuery);
