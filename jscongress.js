var myApp = angular.module('myModule', ['angularUtils.directives.dirPagination']);

myApp.controller("myController", function ($scope, $http) {
    
    $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia','Florida',
                  'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
                  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
                  'North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
                  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    $scope.fav_legislator_json = [] ;
    $scope.fav_bill_json = [] ;
    $scope.fav_committee_json = [] ;
    
    var currStr = "";
    if(localStorage.getItem('legislator_storage') !== null)
    {
        currStr = localStorage.getItem('legislator_storage');
        var splstr = currStr.split(";");
        for(var i=0; i<splstr.length-1; i++) {
            var lego = splstr[i];
            var legos = lego.split("~")
            var  item = {}
            item ["bioguide_id"] = legos[0];
            item ["img"] = legos[1];
            item ["party"] = legos[2];
            item ["last_name"] = legos[3];
            item ["first_name"] = legos[4];
            item["chamber_pic"] = legos[5];
            item ["chamber"] = legos[6];
            item ["state_name"] = legos[7];
            item ["email"] = legos[8];

            $scope.fav_legislator_json.push(item);
        }
    }
    
    if(localStorage.getItem('bill_storage') !== null)
    {
        currStr = localStorage.getItem('bill_storage');
        var splstr = currStr.split(";");
        for(var i=0; i<splstr.length-1; i++) {
            var lego = splstr[i];
            var legos = lego.split("~")

            var  item = {}
            item ["bill_id"] = legos[0];
            item ["bill_type"] = legos[1];
            item ["official_title"] = legos[2];
            item["chamber_pic"] = legos[3];
            item ["chamber"] = legos[4];
            item ["introduced_on"] = legos[5];
            item ["title"] = legos[6];
            item ["last_name"] = legos[7];
            item ["first_name"] = legos[8];

            $scope.fav_bill_json.push(item);
        }
    }
    
    if(localStorage.getItem('committee_storage') !== null)
    {
        currStr = localStorage.getItem('committee_storage');
        var splstr = currStr.split(";");
        for(var i=0; i<splstr.length-1; i++) {
            var lego = splstr[i];
            var legos = lego.split("~")

            var  item = {}
            item ["committee_id"] = legos[0];
            item ["name"] = legos[1];
            item ["chamber_pic"] = legos[2];
            item ["chamber"] = legos[3];
            item ["parent_committee"] = legos[4];
            item ["sub_committee"] = legos[5];

            $scope.fav_committee_json.push(item);
        }
    }



    $http({
        method: 'GET',
        url: 'index.php',
        params: {
            retrieve: "everything"
        }
    }).then(function (response) {
        var json_leg = JSON.parse(response.data[0]);
        var json_active_bill = JSON.parse(response.data[1]);
        var json_new_bill = JSON.parse(response.data[2]);
        var json_com = JSON.parse(response.data[3]);
        $scope.leg_result = json_leg.results;
        $scope.abill_result = json_active_bill.results;
        $scope.nbill_result = json_new_bill.results;
        $scope.com_result = json_com.results;
    });

    $scope.view_leg = function(obj) {
        
        $scope.leg_view = obj;

        var now = new Date().getTime() / 1000;
        var start = new Date(obj.term_start).getTime() / 1000;
        var end = new Date(obj.term_end).getTime() / 1000;
        var progress = parseInt((now - start) / (end - start) * 100);
        var prog="width:"+progress+"%;";
        document.getElementById("leg9").setAttribute("style", prog);
        document.getElementById("leg9").innerHTML = progress+"%";

        var pic1 = "https://theunitedstates.io/images/congress/original/"+obj.bioguide_id+".jpg";
        //var picstyle1 = "";
        document.getElementById("leg1").setAttribute("src", pic1);
        //document.getElementById("leg1").setAttribute("style", picstyle1);
        document.getElementById("leg2").innerHTML = obj.title +". "+ obj.last_name+", "+ obj.first_name;
        var mail = "mailto:"+obj.oc_email;
        document.getElementById("leg3").setAttribute("href", mail);
        document.getElementById("leg3").innerHTML = obj.oc_email;
        document.getElementById("leg4").innerHTML = "Chamber : "+obj.chamber;

        if(obj.phone=="null" || obj.phone=="")
            var cellph = "N.A";
        else
            var cellph = "tel:"+obj.phone;
        document.getElementById("leg5").setAttribute("href", cellph);
        document.getElementById("leg5").innerHTML = obj.phone;

        var pic2 = obj.party+".png"; 
        var picstyle2 = "width:25px; height:25px;";
        document.getElementById("leg6").setAttribute("src", pic2);
        document.getElementById("leg6").setAttribute("style", picstyle2);
        var parties;
        if(obj.party=="R")
            parties=" Republican";
        else if(obj.party=="D")
            parties=" Democrat";
        else if(obj.party=="I")
            parties=" Independent";
        document.getElementById("leg61").innerHTML = parties;

        document.getElementById("leg10").innerHTML = obj.office;
        document.getElementById("leg11").innerHTML = obj.state_name;
        var faxit = "fax:"+obj.fax;
        document.getElementById("leg12").setAttribute("href", faxit);
        document.getElementById("leg12").innerHTML = obj.fax;

        var weblinks = "https://twitter.com/"+obj.twitter_id;
        document.getElementById("leg141").setAttribute("href", weblinks);
        weblinks = "https://www.facebook.com/"+obj.facebook_id;
        document.getElementById("leg142").setAttribute("href", weblinks);
        document.getElementById("leg143").setAttribute("href", obj.website);

        var s = obj.term_start,
        y = +s.substr(0, 4),  
        m = +s.substr(5, 2) - 1, 
        d = +s.substr(8, 2);
        var newDate = monthNames[m]+" "+ d+ ", "+y;
        document.getElementById("leg7").innerHTML = newDate;

        s = obj.term_end;
        y = +s.substr(0, 4);  
        m = +s.substr(5, 2) - 1; 
        d = +s.substr(8, 2);
        newDate = monthNames[m]+" "+ d+ ", "+y;
        document.getElementById("leg8").innerHTML = newDate;

        s = obj.birthday;
        if(s=="" || s=="null")
            newDate="N.A";
        else {
            y = +s.substr(0, 4);  
            m = +s.substr(5, 2) - 1; 
            d = +s.substr(8, 2);
            newDate = monthNames[m]+" "+ d+ ", "+y;
        }
        document.getElementById("leg13").innerHTML = newDate;

        var bioguide = obj.bioguide_id;        
        $http({
        method: 'GET',
        url: 'index.php',
        params: {
            retrieve: "com_bill",
            bioguide_id: bioguide
        }
        }).then(function (response) {
            var json_comm = JSON.parse(response.data[0]);
            var json_bill = JSON.parse(response.data[1]);
            var leg_bill = [];
            var leg_comm = [];
            var i = 0;
            if (json_comm.count > 0) {
                i = 0;
                while (i < 5 && i < json_comm.count) {
                    leg_comm[i] = json_comm.results[i];
                    i++;
                }
            } else {
                leg_comm[0] = "N.A.";
            }

            if (json_bill.count > 0) {
                i = 0;
                while (i < 5 && i < json_bill.count) {
                    leg_bill[i] = json_bill.results[i];
                    i++;
                }
            } else {
                leg_bill[0] = "N.A.";
            }

            $scope.leg_comms = leg_comm;
            $scope.leg_bills = leg_bill;
        });

    };

    $scope.view_bill = function(obj1) {
        $scope.bill_view = obj1;
        
        document.getElementById("bill1").innerHTML = obj1.bill_id;
        document.getElementById("bill2").innerHTML = obj1.official_title;
        document.getElementById("bill3").innerHTML = obj1.bill_type;
        document.getElementById("bill4").innerHTML = obj1.sponsor.title +". "+ obj1.sponsor.last_name+", "+ obj1.sponsor.first_name;
        document.getElementById("bill5").innerHTML = obj1.chamber;
        if(obj1.history.active=="false")
            document.getElementById("bill6").innerHTML = "N.A";
        else
            document.getElementById("bill6").innerHTML = "Active";

        var s = obj1.introduced_on,
        y = +s.substr(0, 4),  
        m = +s.substr(5, 2) - 1, 
        d = +s.substr(8, 2);
        var newDate = monthNames[m]+" "+ d+ ", "+y;
        document.getElementById("bill7").innerHTML = newDate;

        document.getElementById("bill8").setAttribute("href", obj1.urls.congress);
        document.getElementById("bill9").innerHTML = obj1.last_version.version_name;
        document.getElementById("bill10").setAttribute("href", obj1.last_version.urls.pdf);
        document.getElementById("bill111").setAttribute("data", obj1.last_version.urls.pdf);
        document.getElementById("bill112").setAttribute("data", obj1.last_version.urls.pdf);
        document.getElementById("bill10").setAttribute("src", obj1.last_version.urls.pdf);
    }
    $scope.show_favourites = function() {
        document.getElementById("favourite").style.display="block";
        document.getElementById("legislator").style.display="none";
        document.getElementById("bill").style.display="none";
        document.getElementById("committee").style.display="none";
    }
    $scope.show_legislators = function() {
        document.getElementById("legislator").style.display="block";
        document.getElementById("bill").style.display="none";
        document.getElementById("committee").style.display="none";
        document.getElementById("favourite").style.display="none";
    }
    $scope.show_bills = function() {
        document.getElementById("bill").style.display="block";
        document.getElementById("legislator").style.display="none";
        document.getElementById("committee").style.display="none";
        document.getElementById("favourite").style.display="none";
    }
    $scope.show_committees = function() {
        document.getElementById("committee").style.display="block";
        document.getElementById("legislator").style.display="none";
        document.getElementById("bill").style.display="none";
        document.getElementById("favourite").style.display="none";
    }

    $scope.leg_senate = function() {
        document.getElementById("leg_senate_tab").style.display="block";
        document.getElementById("leg_house_tab").style.display="none";
        document.getElementById("leg_state_tab").style.display="none";
    }
    $scope.leg_house = function() {
        document.getElementById("leg_house_tab").style.display="block";
        document.getElementById("leg_senate_tab").style.display="none";
        document.getElementById("leg_state_tab").style.display="none";
    }
    $scope.leg_state = function() {
        document.getElementById("leg_state_tab").style.display="block";
        document.getElementById("leg_senate_tab").style.display="none";
        document.getElementById("leg_house_tab").style.display="none";
    }

    $scope.billactive = function() {
        document.getElementById("bill_active_tab").style.display="block";
        document.getElementById("bill_new_tab").style.display="none";    
    }
    $scope.billnew = function() {
        document.getElementById("bill_new_tab").style.display="block";
        document.getElementById("bill_active_tab").style.display="none";
    }

    $scope.com_senate = function() {
        document.getElementById("com_senate_tab").style.display="block";
        document.getElementById("com_house_tab").style.display="none";
        document.getElementById("com_joint_tab").style.display="none";
    }
    $scope.com_house = function() {
        document.getElementById("com_house_tab").style.display="block";
        document.getElementById("com_senate_tab").style.display="none";
        document.getElementById("com_joint_tab").style.display="none";
    }
    $scope.com_joint = function() {
        document.getElementById("com_joint_tab").style.display="block";
        document.getElementById("com_senate_tab").style.display="none";
        document.getElementById("com_house_tab").style.display="none";
    }

    $scope.fav_legislator = function() {
        document.getElementById("fav_leg_tab").style.display="block";
        document.getElementById("fav_bill_tab").style.display="none";
        document.getElementById("fav_com_tab").style.display="none";
    }
    $scope.fav_bill = function() {
        document.getElementById("fav_leg_tab").style.display="none";
        document.getElementById("fav_bill_tab").style.display="block";
        document.getElementById("fav_com_tab").style.display="none";
    }
    $scope.fav_committee = function() {
        document.getElementById("fav_leg_tab").style.display="none";
        document.getElementById("fav_bill_tab").style.display="none";
        document.getElementById("fav_com_tab").style.display="block";
    }

    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }



    $scope.star_leg = function(leg_view) {
       
        var currStr = "";
        if(localStorage.getItem('legislator_storage') !== null)
        {
            currStr = localStorage.getItem('legislator_storage');
        }

        var pic_url = "https://theunitedstates.io/images/congress/original/" + leg_view.bioguide_id + ".jpg";
        var party_symb = "";
        if (leg_view.party=="R"){
            party_symb = "r.png";
        }
        else if (leg_view.party == "D"){
            party_symb = "d.png";
        }
        else if (leg_view.party == "I"){
            party_symb = "i.png";
        }

        var chamber_pic ="";
        if (leg_view.chamber=="house"){
              chamber_pic = "h.png";
            } 
            else {
               chamber_pic = "s.svg";
            }


        currStr += leg_view.bioguide_id + "~" + pic_url + "~" + party_symb + "~" + leg_view.last_name + "~" +leg_view.first_name + "~" + chamber_pic + "~" + leg_view.chamber + "~" + leg_view.state_name + "~" + leg_view.oc_email + ";";


        localStorage.setItem('legislator_storage', currStr);

        var  item = {}
        item ["bioguide_id"] = leg_view.bioguide_id;
        item ["img"] = pic_url;
        item ["party"] = party_symb;
        item ["last_name"] = leg_view.last_name;
        item ["first_name"] = leg_view.first_name;
        item["chamber_pic"] = chamber_pic;
        item ["chamber"] = leg_view.chamber;
        item ["state_name"] = leg_view.state_name;
        item ["email"] = leg_view.oc_email;

        $scope.fav_legislator_json.push(item);

    }
    
    $scope.star_com = function(com_view) {
        
        var currStr = "";
        if(localStorage.getItem('committee_storage') !== null)
        {
            currStr = localStorage.getItem('committee_storage');
        }

        var comid = com_view.committee_id;
        var comname = com_view.name;
        var compar = com_view.parent_committee_id;
        if(compar=="" || compar=="null" || compar=="undefined")
            compar = "N.A";
        
        var chamber_pic ="";
        if (com_view.chamber=="house"){
              chamber_pic = "h.png";
            } 
            else {
               chamber_pic = "s.svg";
            }


        currStr += comid + "~" + comname + "~" + chamber_pic + "~" + com_view.chamber + "~" + compar + "~" + com_view.subcommittee + ";";

        localStorage.setItem('committee_storage', currStr);

        var  item = {}
        item ["committee_id"] = comid;
        item ["name"] = comname;
        item ["chamber_pic"] = chamber_pic;
        item ["chamber"] = com_view.chamber;
        item ["parent_committee"] = compar;
        item ["sub_committee"] = com_view.subcommittee;

        $scope.fav_committee_json.push(item);

    }
    
    $scope.star_bill = function(bill_view) {
        
        var currStr = "";
        if(localStorage.getItem('bill_storage') !== null)
        {
            currStr = localStorage.getItem('bill_storage');
        }

        var billid = bill_view.bill_id;
        var billtype = bill_view.bill_type;

        var chamber_pic ="";
        if (bill_view.chamber=="house"){
              chamber_pic = "h.png";
            } 
            else {
               chamber_pic = "s.svg";
            }


        currStr += billid + "~" + billtype + "~" + bill_view.official_title + "~" + chamber_pic + "~" + bill_view.chamber + "~" + bill_view.introduced_on + "~" + bill_view.sponsor.title + "~" + bill_view.sponsor.last_name + "~" + bill_view.sponsor.first_name + ";";


        localStorage.setItem('bill_storage', currStr);

        var  item = {}
        item ["bill_id"] = billid;
        item ["bill_type"] = billtype;
        item ["official_title"] = bill_view.official_title;
        item["chamber_pic"] = chamber_pic;
        item ["chamber"] = bill_view.chamber;
        item ["introduced_on"] = bill_view.introduced_on;
        item ["title"] = bill_view.sponsor.title;
        item ["last_name"] = bill_view.sponsor.last_name;
        item ["first_name"] = bill_view.sponsor.first_name;

        $scope.fav_bill_json.push(item);

    }
    
});