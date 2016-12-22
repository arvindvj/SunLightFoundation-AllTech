<?php
    if($_GET['retrieve'] == "everything") {
        $leg = "http://congress.api.sunlightfoundation.com/legislators?apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);

        $active_bill = "http://congress.api.sunlightfoundation.com/bills?history.active=true&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=50";
        $json_active_bill = file_get_contents($active_bill);

        $new_bill = "http://congress.api.sunlightfoundation.com/bills?history.active=false&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=50";
        $json_new_bill = file_get_contents($new_bill);

        $committee = "http://congress.api.sunlightfoundation.com/committees?apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_committee = file_get_contents($committee);

        $json_array = array($json_leg, $json_active_bill,$json_new_bill,$json_committee);
        echo json_encode($json_array);
    }
    else if($_GET['retrieve']=="com_bill") {
        $bioguide = $_GET['bioguide_id'] ;

        $bill = "http://congress.api.sunlightfoundation.com/bills?sponsor_id=".$bioguide."&apikey=725651676ce9425d9cea2e39d3c2dc88";
        $json_bill = file_get_contents($bill);

        $comm = "http://congress.api.sunlightfoundation.com/committees?member_ids=".$bioguide."&apikey=725651676ce9425d9cea2e39d3c2dc88";
        $json_comm = file_get_contents($comm);

        $json_arr = array($json_comm, $json_bill);
        echo json_encode($json_arr);
    }
    else if ($_GET['retrieve'] === "legislator") {
        $leg = "http://congress.api.sunlightfoundation.com/legislators?apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "legislatorhouse") {
        $leg = "http://congress.api.sunlightfoundation.com/legislators?chamber=house&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "legislatorsenate") {
        $leg = "http://congress.api.sunlightfoundation.com/legislators?chamber=senate&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "activebill") {
        $active_bill = "http://congress.api.sunlightfoundation.com/bills?history.active=true&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=50";
        $json_active_bill = file_get_contents($active_bill);
        $json_array = array($json_active_bill);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "newbill") {
        $new_bill = "http://congress.api.sunlightfoundation.com/bills?history.active=false&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=50";
        $json_new_bill = file_get_contents($new_bill);
        $json_array = array($json_new_bill);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "committeesenate") {
        $leg = "http://congress.api.sunlightfoundation.com/committees?chamber=senate&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "committeehouse") {
        $leg = "http://congress.api.sunlightfoundation.com/committees?chamber=house&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
    else if ($_GET['retrieve'] === "committeejoint") {
        $leg = "http://congress.api.sunlightfoundation.com/committees?chamber=joint&apikey=725651676ce9425d9cea2e39d3c2dc88&per_page=all";
        $json_leg = file_get_contents($leg);
        $json_array = array($json_leg);
        echo json_encode($json_array);
    }
?>