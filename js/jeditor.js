(function ($) {
    $.fn.jeditor = function (options) {
        let $jeditor = $(this);
        let jeditorHTML = "<div class=\"jeditor-menu container-fluid\" style=\"margin-top:20px;\">";
        jeditorHTML += "        <div class=\"jeditor-buttons-container col-lg-5\">";
        jeditorHTML += "            <div class=\"jeditor-buttons col-lg-12\">";
        jeditorHTML += "                <label>Jeditor Buttons<\/label><br>";
        jeditorHTML += "                <button data-click=\"1\" class=\"btn btn-default btn-sm jeditor-btn-code\"><i class=\"fa fa-code\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-bold\"><i class=\"fa fa-bold\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-italic\"><i class=\"fa fa-italic\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-underline\"><i class=\"fa fa-underline\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-align-center\"><i class=\"fa fa-align-center\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-align-justify\"><i class=\"fa fa-align-justify\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-align-left\"><i class=\"fa fa-align-left\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-align-right\"><i class=\"fa fa-align-right\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-list-ol\"><i class=\"fa fa-list-ol\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-list-ul\"><i class=\"fa fa-list-ul\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-undo\"><i class=\"fa fa-rotate-left\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-redo\"><i class=\"fa fa-rotate-right\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "                <button class=\"btn btn-default btn-sm jeditor-btn-remove-format\"><i class=\"fa fa-times\" aria-hidden=\"true\"><\/i><\/button>";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "        <\/div>";
        jeditorHTML += "        <div class=\"jeditor-font-styles col-lg-7\">";
        jeditorHTML += "            <div class=\"jeditor-font-back-color-container col-lg-2\">";
        jeditorHTML += "                <label class=\"jeditor-font-back-color-label\">Back Color<\/label>";
        jeditorHTML += "                <input type=\"color\" class=\"jeditor-font-back-color form-control\">";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "            <div class=\"jeditor-font-fore-color-container col-lg-2\">";
        jeditorHTML += "                <label class=\"jeditor-font-fore-color-label\">Fore Color<\/label>";
        jeditorHTML += "                <input type=\"color\" class=\"jeditor-font-fore-color form-control\">";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "            <div class=\"jeditor-font-size-container col-lg-2\">";
        jeditorHTML += "                <label class=\"jeditor-font-size-label\">Font Size<\/label>";
        jeditorHTML += "                <select class=\"jeditor-font-size form-control\">";
        jeditorHTML += "                    <option val=\"1\">1<\/option>";
        jeditorHTML += "                    <option val=\"2\">2<\/option>";
        jeditorHTML += "                    <option val=\"3\" selected=\"selected\">3<\/option>";
        jeditorHTML += "                    <option val=\"4\">4<\/option>";
        jeditorHTML += "                    <option val=\"5\">5<\/option>";
        jeditorHTML += "                    <option val=\"6\">6<\/option>";
        jeditorHTML += "                    <option val=\"7\">7<\/option>";
        jeditorHTML += "                <\/select>";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "            <div class=\"jeditor-font-container  col-lg-6\">";
        jeditorHTML += "                <label class=\"jeditor-font-label\">Font<\/label>";
        jeditorHTML += "                <select class=\"jeditor-font form-control\">";
        jeditorHTML += "                    <option style=\"font-family: Agency FB !important\" val=\"Agency FB\" class=\"jeditor-font-size\">Agency";
        jeditorHTML += "                        FB";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Arial !important\" val=\"Arial\" class=\"jeditor-font-size\">Arial<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Arial Black !important\" val=\"Arial Black\" class=\"jeditor-font-size\">Arial";
        jeditorHTML += "                        Black";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Arial Narrow !important\" val=\"Arial Narrow\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Arial Narrow";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Arial Rounded MT Bold !important\" val=\"Arial Rounded MT Bold\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Arial Rounded MT Bold";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Blackadder ITC !important\" val=\"Blackadder ITC\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Blackadder ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Bodoni MT !important\" val=\"Bodoni MT\" class=\"jeditor-font-size\">Bodoni";
        jeditorHTML += "                        MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Book Antiqua !important\" val=\"Book Antiqua\" class=\"jeditor-font-size\">Book";
        jeditorHTML += "                        Antiqua";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Bookman Old Style !important\" val=\"Bookman Old Style\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Bookman Old Style";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Bradley Hand ITC !important\" val=\"Bradley Hand ITC\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Bradley Hand ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Calisto MT !important\" val=\"Calisto MT\" class=\"jeditor-font-size\">Calisto";
        jeditorHTML += "                        MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Castellar !important\" val=\"Castellar\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Castellar";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Century !important\" val=\"Century\" class=\"jeditor-font-size\">Century";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Century Gothic !important\" val=\"Century Gothic\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Century Gothic";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Century Schoolbook !important\" val=\"Century Schoolbook\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Century Schoolbook";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Comic Sans MS !important\" val=\"Comic Sans MS\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Comic Sans MS";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Copperplate Gothic Bold	 !important\" val=\"Copperplate Gothic Bold\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Copperplate Gothic Bold";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Copperplate Gothic Light !important\" val=\"Copperplate Gothic Light \"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Copperplate Gothic Light";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Courier New	 !important\" val=\"Courier New\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Courier New";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Curlz MT !important\" val=\"Curlz MT\" class=\"jeditor-font-size\">Curlz MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Edwardian Script ITC !important\" val=\"Edwardian Script ITC\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Edwardian Script ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Elephant !important\" val=\"Elephant\" class=\"jeditor-font-size\">Elephant";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Engravers MT !important\" val=\"Engravers MT\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Engravers MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Eras Bold ITC !important\" val=\"Eras Bold ITC\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Eras Bold ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Eras Demi ITC !important\" val=\"Eras Demi ITC\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Eras Demi ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Eras Light ITC !important\" val=\"Eras Light ITC\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Eras Light ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Eras Medium ITC !important\" val=\"Eras Medium ITC\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Eras Medium ITC";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Estrangelo Edessa !important\" val=\"Estrangelo Edessa\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Estrangelo Edessa";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Felix Titling !important\" val=\"Felix Titling\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Felix Titling";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Fixedsys !important\" val=\"Fixedsys\" class=\"jeditor-font-size\">Fixedsys";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Forte MT !important\" val=\"Forte MT\" class=\"jeditor-font-size\">Forte MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Book !important\" val=\"Franklin Gothic Book\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Franklin Gothic Book";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Demi !important\" val=\"Franklin Gothic Demi\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Franklin Gothic Demi";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Demi cond !important\" val=\"Franklin Gothic Demi cond\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Franklin Gothic Demi cond";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Heavy !important\" val=\"Franklin Gothic Heavy\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Franklin Gothic Heavy";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Medium !important\" val=\"Franklin Gothic Medium\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Franklin Gothic Medium";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Franklin Gothic Medium cond	 !important\"";
        jeditorHTML += "                            val=\"Franklin Gothic Medium cond\" class=\"jeditor-font-size\">Franklin Gothic Medium cond";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:French Script MT !important\" val=\"French Script MT\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">French Script MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Garamond !important\" val=\"Garamond\" class=\"jeditor-font-size\">Garamond";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Gautami !important\" val=\"Gautami\" class=\"jeditor-font-size\">Gautami";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Georgia !important\" val=\"Georgia\" class=\"jeditor-font-size\">Georgia";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Gigi !important\" val=\"Gigi\" class=\"jeditor-font-size\">Gigi<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Gill Sans MT !important\" val=\"Gill Sans MT\" class=\"jeditor-font-size\">Gill";
        jeditorHTML += "                        Sans MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Gill Sans MT Condensed !important\" val=\"Gill Sans MT Condensed\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Gill Sans MT Condensed";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Gill Sans MT Ext Condensed Bold	 !important\"";
        jeditorHTML += "                            val=\"Gill Sans MT Condensed Bold\" class=\"jeditor-font-size\">Gill Sans MT Condensed Bold";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Goudy Old Style	 !important\" val=\"Goudy Old Style\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Goudy Old Style";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Goudy Stout	 !important\" val=\"Goudy Stout\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Goudy Stout";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Haettenschweiler !important\" val=\"Haettenschweiler\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Haettenschweiler";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Impact !important\" val=\"Impact\" class=\"jeditor-font-size\">Impact<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Imprint MT Shadow !important\" val=\"Imprint MT Shadow\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Imprint MT Shadow";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Latha !important\" val=\"Latha\" class=\"jeditor-font-size\">Latha<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Lucida Console	 !important\" val=\"Lucida Console\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Lucida Console";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Lucida Sans	!important\" val=\"Lucida Sans\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Lucida Sans";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Lucida Sans Typewriter	!important\" val=\"Lucida Sans Typewriter\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Lucida Sans Typewriter";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Lucida Sans Unicode	!important\" val=\"Lucida Sans Unicode\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Lucida Sans Unicode";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Monotype Corsiva !important\" val=\"Monotype Corsiva\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Monotype Corsiva";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:MS Reference Sans Serif	 !important\" val=\"MS Reference Sans Serif\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">MS Reference Sans Serif";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:MS Sans Serif !important\" val=\"MS Sans Serif\" class=\"jeditor-font-size\">MS";
        jeditorHTML += "                        Sans Serif";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:MS Serif !important\" val=\"MS Serif\" class=\"jeditor-font-size\">MS Serif";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:MV Boli	!important\" val=\"MV Boli\" class=\"jeditor-font-size\">MV Boli";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Maiandra GD	!important\" val=\"Maiandra GD\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Maiandra GD";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Mangal !important\" val=\"Mangal\" class=\"jeditor-font-size\">Mangal<\/option>";
        jeditorHTML += "                    <option style=\"font-family:OCR A Extended !important\" val=\"OCR A Extended\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        OCR A Extended";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Palace Script MT !important\" val=\"Palace Script MT\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Palace Script MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Palatino Linotype !important\" val=\"Palatino Linotype\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Palatino Linotype";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Papyrus !important\" val=\"Papyrus\" class=\"jeditor-font-size\">Papyrus";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Perpetua !important\" val=\"Perpetua\" class=\"jeditor-font-size\">Perpetua";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Perpetua Titling MT	 !important\" val=\"Perpetua Titling MT\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Perpetua Titling MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Photoshop Large	 !important\" val=\"Photoshop Large\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Photoshop Large";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Photoshop Small	!important\" val=\"Photoshop Small\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Photoshop Small";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Placard MT Condensed !important\" val=\"Placard MT Condensed\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Placard MT Condensed";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Pristina !important\" val=\"Pristina\" class=\"jeditor-font-size\">Pristina";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Raavi !important\" val=\"Raavi\" class=\"jeditor-font-size\">Raavi<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Rage Italic	 !important\" val=\"Rage Italic\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Rage Italic";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Rockwell !important\" val=\"Rockwell\" class=\"jeditor-font-size\">Rockwell";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Rockwell Condensed !important\" val=\"Rockwell Condensed\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Rockwell Condensed";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Script MT Bold !important\" val=\"Script MT Bold\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Script MT Bold";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Shruti !important\" val=\"Shruti\" class=\"jeditor-font-size\">Shruti<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Small Fonts	!important\" val=\"Small Fonts\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Small Fonts";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Sylfaen	!important\" val=\"Sylfaen\" class=\"jeditor-font-size\">Sylfaen";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:System	!important\" val=\"System\" class=\"jeditor-font-size\">System";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Tahoma	!important\" val=\"Tahoma\" class=\"jeditor-font-size\">Tahoma";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Terminal !important\" val=\"Terminal\" class=\"jeditor-font-size\">Terminal";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Times New Roman	 !important\" val=\"Times New Roman\"";
        jeditorHTML += "                            class=\"jeditor-font-size\" selected=\"selected\">Times New Roman";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Trebuchet MS !important\" val=\"Trebuchet MS\" class=\"jeditor-font-size\">";
        jeditorHTML += "                        Trebuchet MS";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Tunga !important\" val=\"Tunga\" class=\"jeditor-font-size\">Tunga<\/option>";
        jeditorHTML += "                    <option style=\"font-family:Tw Cen MT !important\" val=\"Tw Cen MT\" class=\"jeditor-font-size\">Tw Cen";
        jeditorHTML += "                        MT";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Tw Cen MT Condensed	 !important\" val=\"Tw Cen MT Condensed\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Tw Cen MT Condensed";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Tw Cen MT Conden Extra Bold	!important\"";
        jeditorHTML += "                            val=\"Tw Cen MT Conden Extra Bold\" class=\"jeditor-font-size\">Tw Cen MT Conden Extra Bold";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Verdana	!important\" val=\"Verdana\" class=\"jeditor-font-size\">Verdana";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:Vietnamese font	!important\" val=\"Vietnamese font\"";
        jeditorHTML += "                            class=\"jeditor-font-size\">Vietnamese font";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                    <option style=\"font-family:WST_Engl !important\" val=\"WST_Engl\" class=\"jeditor-font-size\">WST_Engl";
        jeditorHTML += "                    <\/option>";
        jeditorHTML += "                <\/select>";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "        <\/div>";
        jeditorHTML += "        <div class=\"jeditor-text-container col-lg-12\">";
        jeditorHTML += "            <div spellcheck=\"false\" contenteditable=\"true\" style=\"margin-top:20px;height:100%;\" class=\"col-lg-12 well jeditor-text\">";
        jeditorHTML += "            <\/div>";
        jeditorHTML += "        <\/div>";
        jeditorHTML += "    <\/div>";

        $(document).one("ready", init);

        $jeditor.on("click", ".jeditor-btn-code", code);
        $jeditor.on("click", ".jeditor-btn-bold", bold);
        $jeditor.on("click", ".jeditor-btn-italic", italic);
        $jeditor.on("click", ".jeditor-btn-underline", underline);
        $jeditor.on("click", ".jeditor-btn-align-center", alignCenter);
        $jeditor.on("click", ".jeditor-btn-align-justify", alignJustify);
        $jeditor.on("click", ".jeditor-btn-align-left", alignLeft);
        $jeditor.on("click", ".jeditor-btn-list-ol", listOl);
        $jeditor.on("click", ".jeditor-btn-list-ul", listUl);
        $jeditor.on("click", ".jeditor-btn-undo", undo);
        $jeditor.on("click", ".jeditor-btn-redo", redo);
        $jeditor.on("click", ".jeditor-btn-remove-format", removeFormat);

        $jeditor.on("change", ".jeditor-font-back-color", backColor);
        $jeditor.on("change", ".jeditor-font-fore-color", foreColor);
        $jeditor.on("change", ".jeditor-font-size", fontSize);
        $jeditor.on("change", ".jeditor-font", font);

        function init() {
            $jeditor.html(jeditorHTML);
        }

        function command(aCommandName, aShowDefaultUI, aValueArgument) {
            document.execCommand(aCommandName, aShowDefaultUI, aValueArgument);
        }

        function bold() {
            command("bold", false, null);
        }

        function italic() {
            command("italic", false, null);
        }

        function underline() {
            command("underline", false, null);
        }

        function alignCenter() {
            command("justifyCenter", false, null);
        }

        function alignJustify() {
            command("justifyFull", false, null);
        }

        function alignLeft() {
            command("justifyLeft", false, null);
        }

        function alignRight() {
            command("justifyRight", false, null);
        }

        function listOl() {
            command("insertOrderedList", false, null);
        }

        function listUl() {
            command("insertUnorderedList", false, null);
        }

        function undo() {
            command("undo", false, null);
        }

        function redo() {
            command("redo", false, null);
        }

        function removeFormat() {
            command("removeFormat", false, null);
        }

        function backColor() {
            let $that = $(this);
            let color = $that.val();
            command("backColor", false, color);
        }

        function foreColor() {
            let $that = $(this);
            let color = $that.val();
            command("foreColor", false, color);
        }

        function fontSize() {
            let $that = $(this);
            let size = $that.val();
            command("fontSize", false, size);
        }

        function font() {
            let $that = $(this);
            let name = $that.val();
            command("fontName", false, name);
        }

        function html(value = "") {
            if (value == "") {
                return $jeditor.find(".jeditor-text").html().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            } else {
                return $jeditor.find(".jeditor-text").html(value);
            }
        }

         function text(value = "") {
            if (value == "") {
                return $jeditor.find(".jeditor-text").text().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            } else {
                return $jeditor.find(".jeditor-text").text(value);
            }
        }

        function code() {
            $that = $(this);
            let clickCount = $that.data("click");
            if (clickCount) {
                $that.data("click", 0);
                $jeditor.find(".jeditor-buttons>button:not(.jeditor-btn-code)").attr("disabled", true);
                $jeditor.find(".jeditor-font-styles").attr("disabled", true);
                let codeEdit = html().replace(/</g, '&lt;');
                $jeditor.find(".jeditor-text").html(codeEdit);
            } else {
                $that.data("click", 1);
                $jeditor.find(".jeditor-buttons>button:not(.jeditor-btn-code)").attr("disabled", false);
                $jeditor.find(".jeditor-font-styles").attr("disabled", false);
                $jeditor.find(".jeditor-text").html(html());
            }
        }

        return {
            html: html,
            text : text
        };

    };
})(jQuery);