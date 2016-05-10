(function() {
    DARKENED_HEADER_SCROLL_POSITION = 50;
    SHRINKED_HEADER_SCROLL_POSITION = 386;
    hasDarkenedHeader = false;
    hasShrinkedHeader = false;

    $(window).scroll(function(){
        var scrollPosition = $(document).scrollTop();
        if(!hasDarkenedHeader && scrollPosition > DARKENED_HEADER_SCROLL_POSITION){
            $('header').addClass('header-darkened');
            hasDarkenedHeader = true;
        }
        if(hasDarkenedHeader && scrollPosition < DARKENED_HEADER_SCROLL_POSITION){
            $('header').removeClass('header-darkened');
            hasDarkenedHeader = false;
        }
        if(!hasShrinkedHeader && scrollPosition > SHRINKED_HEADER_SCROLL_POSITION){
            $('header').addClass('header-shrinked');
            hasShrinkedHeader = true;
        }
        if(hasShrinkedHeader && scrollPosition < SHRINKED_HEADER_SCROLL_POSITION){
            $('header').removeClass('header-shrinked');
            hasShrinkedHeader = false;
        }
    });

    $('#naviButton').click(function(){
        $(this).toggleClass("open");
        $('header').toggleClass("open").toggleClass("closed");
    });

    $('nav a').click(function(){
        $('#naviButton').click();
    });

    var container = document.getElementById( 'container' ),
        dlgtrigger = document.querySelector( '[data-dialog]' ),
        somedialog = document.getElementById( "projectDialog" ),
        dlg = new DialogFx( somedialog, {
            onOpenDialog : function( instance ) {
                classie.add( container, 'container--move' );
                document.body.style.overflow = 'hidden';
            },
            onCloseDialog : function( instance ) {
                classie.remove( container, 'container--move' );
                document.body.style.overflow = 'auto';
            }
        } );

    loadProject = function($el){
        var href = $el.attr('href');
        var title = $el.find('h3').text();
        $currentViewingProject = $el;
        $('#dialogTitle').text(title);
        $('#dialogContentFrame').html('<div class="preloader"><img src="img/preloader.gif"/></div>');
        $('#dialogContentFrame').load(href);
    }

    $('#previousProjectButton').click(function(){
        $parent = $currentViewingProject.parent();
        if($parent.prev().length == 0){
            loadProject($parent.parent().children(":last").find('[data-dialog]'));
        }
        else{
            loadProject($parent.prev().find('[data-dialog]'));
        }
    });

    $('#nextProjectButton').click(function(){
        $parent = $currentViewingProject.parent();
        if($parent.next().length == 0){
            loadProject($parent.parent().children(":first").find('[data-dialog]'));
        }
        else{
            loadProject($parent.next().find('[data-dialog]'));
        }
    });

    $('[data-dialog]').click(function(e){
        loadProject($(this));
        dlg.toggle();
        e.preventDefault();
    });

})();