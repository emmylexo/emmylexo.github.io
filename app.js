window.fn = {};
var items = [];

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

document.addEventListener('init', function(event){
  if(event.target.id == 'home'){
    opendb();

    var lists = getitems();
    for (var i in lists){
      var product = lists[i];
      var item_names = product.note;
      var subject = product.subject;
      var item_id = product.id;
      var num = item_names.length;
      if(num >37){
        var text = item_names.substr(0, 37);
        var output = "<ons-list-item modifier='chevron' tappable onclick='move("+item_id+")' id='note"+item_id+"'><div class='center'><span class='list-item__title'>"+subject+"</span><span class='list-item__subtitle'>"+text+"<b>....</b></span></div><div class=\"right\"><ons-button onclick='deletebtn("+item_id+");'><ons-icon icon=\"trash\"></ons-icon></ons-button></div></ons-list-item>";
      } else{
        var output = "<ons-list-item modifier='chevron' onclick='move("+item_id+")' tappable id='note"+item_id+"'><div class='center'><span class='list-item__title'>"+subject+"</span><span class='list-item__subtitle'>"+item_names+"</span></div><div class=\"right\"><ons-button onclick='deletebtn("+item_id+");'><ons-icon icon=\"trash\"></ons-icon></ons-button></div></ons-list-item>";
      }
      
      $("#Shoppinglist").prepend(output);

    }

    if(lists.length == 0){
      var output = "<ons-list-item> No item Found</ons-list-item>";
      $("#Shoppinglist").prepend(output);
    }
  }

})

function move(id){
  alert(id);
}

function opendb(){
  if(typeof(Storage)!=="undefined")
  {
  // alert("good to go");
  }
else
  {
  alert("not supported");
  }
}


function additems(){
    var names = document.getElementById('item').value;
    var subject = document.getElementById('subject').value;
    if(names != '' && subject != ''){
      var list = getitems();
      var num = list.length;
      var id = num+1;
      list.push({id: id, note: names, subject: subject});
      try{
        localStorage.setItem("Items", JSON.stringify(list));
      } catch (e){
        alert("Error Saving to storage");
        throw e;
      }
    }

    fn.load("home.html");
}

function setList(list){
  try{
    $("#Shoppinglist").empty();
    var lists = getitems();
    lists.push(list);
    localStorage.setItem("Items", JSON.stringify(list));

  } catch(e){
    ons.notification.alert("Error Saving to Storage");
    throw e;
  }
}


function getitems(){
  var list = localStorage.getItem("Items");
    if(list == null){
      return new Array();
    } else{
      return JSON.parse(list);
    }

}

function deletebtn(id){
  var id = id;
  var lists = getitems();
    for (var i in lists){
      if(lists[i].id == id){
        lists.splice(i, 1);
        break;
      }
    }
    var newlist = lists.push(lists);
   setList(lists);
   fn.load('home.html');
}

function calc(){
  var words = document.getElementById("item").value;
  charc = words.split(" ");
  var number = charc.length;
  var left = 100 - number;
  if(left == 0){
    $("#item").attr("disabled","disabled");
    
  }
  document.getElementById("left").innerHTML = left+" word(s) left";

}
