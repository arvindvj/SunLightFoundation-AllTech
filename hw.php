<?php
    $sun_url = 'http://congress.api.sunlightfoundation.com/legislators?apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all';
    $sun_json = file_get_contents($sun_url);
    echo $sun_json;
?>