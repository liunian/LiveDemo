<?php
if(isset($_REQUEST['onlyCode']) && $_REQUEST['onlyCode'] == true && isset($_REQUEST['demoCode'])){
    $code = $_REQUEST['demoCode'];
    
    #$code = preg_replace('/tpircs/', 'script', $code);
    #$code = preg_replace('/kcilcno/', 'onclick', $code);
    $code = htmlspecialchars_decode($code, ENT_QUOTES);
    
    echo $code;
}
else {
    displayPage();
}
?>

<?php
function displayPage(){
?>
<!DOCTYPE html>
<html>
<head>
    <title>LiveDemo Runtime Environment</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="CodeMirror/lib/codemirror.css">
    <link rel="stylesheet" href="CodeMirror/theme/default.css">
    <link rel="stylesheet" href="LiveDemo.css" type="text/css" media="screen">
    <style type="text/css">
    .a{width:100%; height:100%;}
    .a .CodeMirror-scroll{max-height:100%;}
    .a .a-b-c{max-height:100%;}
    </style>
    <script type="text/javascript" src="CodeMirror/lib/codemirror.js"></script>
    <script type="text/javascript" src="CodeMirror/mode/xml/xml.js"></script>
    <script type="text/javascript" src="CodeMirror/mode/javascript/javascript.js"></script>
    <script type="text/javascript" src="CodeMirror/mode/css/css.js"></script>
    <script type="text/javascript" src="CodeMirror/mode/htmlmixed/htmlmixed.js"></script>
    <script type="text/javascript" src="LiveDemo.js"></script>
</head>
<body>
    <div class="a">
        <div class="a-a">
            <span class="a-a-c a-a-a current">Code</span>
            <span class="a-a-c a-a-b">Render</span>
        </div>
        <div class="a-b">
            <div class="a-b-c a-b-a" style="display:block;">
                <!-- generate target and iframe name by js -->
                <form class="a-b-a-f" action="try.php?onlyCode=true" method="post" autocomplete="off">
                    <textarea name="demoCode" class="a-b-a-t">
<!doctype html>
<html>
<head>
</head>
<body>
    <p id="version"></p>
    <script type="text/javascript">
        document.getElementById('version').innerHTML = 'Output version here';
    </script>
</body>
</html>
                    </textarea>				    
                </form>
            </div>
            <div class="a-b-c a-b-b"></div><!-- generate iframe by js -->
        </div>
    </div>
    <script type="text/javascript">
        new LiveDemo();
    </script>
</body>
</html>

<?php
}
?>
