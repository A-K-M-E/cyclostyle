if ('serviceWorker' in navigator) { navigator.serviceWorker.register('../js/sw.js') .then(function(registration) { console.log('Registration successful, scope is:', registration.scope); }) .catch(function(error) { console.log('Service worker registration failed, error:', error); }); }

// forse tutto ciò va inserito all'evento del click del bottone, così si sposta in quel momento il problema

var unsavedChanges ="";
var shareModal = "";
var copyModal = "";
var qrModal = "";
var cookieDisc ="";
var pannelli ="";

document.addEventListener('DOMContentLoaded', async () => {
    // codice preso da qui:
// https://github.com/ipfs/js-ipfs/tree/master/examples/browser-script-tag
// al posto di usare il cdn ho usato ipfs per il file javascript di interfacca a ipfs
  const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
  window.node = node
  //if(node.isOnline()) $("#main").show();
  console.log(node)

    // You can write more code here to use it. Use methods like
    // node.add, node.get. See the API docs here:
    // https://github.com/ipfs/js-ipfs/tree/master/packages/interface-ipfs-core
  // vars

  // bottone per Ipfs
  const ipsf_button = document.querySelectorAll('.printipfs');
  var loadingCover = document.querySelector('.uploading');
  var el=document.querySelector('footer.footer');

  ipsf_button.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      loadingCover.classList.remove('hide');
      el.style.display = 'none';
    });
  });

// cropper
  let result = document.querySelector('.result'),
  img_result = document.querySelector('.img-result'),
  img_w = document.querySelector('.img-w'),
  img_h = document.querySelector('.img-h'),
  save = document.querySelector('.box-cropper'),
  close = document.querySelector('.close'),
  cropped = document.querySelector('.cropped'),
  upload = document.querySelector('#cover'),
  cropper = '';



  // on change show image with crop options
  upload.addEventListener('change', (e) => {
    if (e.target.files.length) {
      // start file reader
      const reader = new FileReader();
      reader.onload = (e)=> {
        if(e.target.result){
          // create new image
          let img = document.createElement('img');
          img.id = 'image';
          img.src = e.target.result
          // clean result before
          result.innerHTML = '';
          // append new image
          result.appendChild(img);
          // show save btn and options
          save.style.height = window.innerHeight;
          result.style.top = save.scrollTop;
          save.classList.remove('hide');

          // init cropper
          cropper = new Cropper(img, {
            aspectRatio: 16 / 6
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // save on click
  save.addEventListener('click',(e)=>{
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({
      width: img_w.value //
    }).toDataURL();
    // remove hide class of img
    cropped.classList.remove('hide');
    img_result.classList.remove('hide');
    close.classList.remove('hide');
    // show image cropped
    cropped.src = imgSrc;
  });
  close.addEventListener('click',(e)=>{
    e.preventDefault();
    save.classList.add('hide');
    });



  // eventList su save-draft
  let saveDraft = document.querySelectorAll(".save-draft")
  for(let i=0;i<saveDraft.length;i++){
    saveDraft[i].addEventListener('click', function(e){
        saveLocal();
    })
  }

  // add draft to the elementList
  if(localStorage.length!=0){
    for(let i=0;i<localStorage.length;i++){
      if(localStorage[i].includes('"status":"draft"')){
        let draftEl=JSON.parse(localStorage[i])
        addToDraft(draftEl);
      }
      if(localStorage[i].includes('"status":"bookmark"')){
        let bookm=JSON.parse(localStorage[i])
        addToBookmark(bookm);
      }
    }
  }



  /*let edit_link=document.getElementsByClassName("edit-link");
  for(let el=0;el<edit_link.length;el++){
    if(edit_link[el].classList.contains("preview")==true){
      let element_draft_title=edit_link[el].parentElement.parentElement.parentElement.getElementsByTagName("h5")[0].textContent;
      edit_link[el].addEventListener('click',function(event){
        event.preventDefault();
        retrieveInfo(element_draft_title);
      });
    }
    else {
      edit_link[el].addEventListener('click',function(event){
        event.preventDefault();
        retrieveInfo(edit_link[el].textContent);
      });
    }
  } */

  // check cookie 4 localStorage disclaimer
  cookieDisc = new bootstrap.Modal(document.getElementById('disclaimer-storage'), {keyboard: false});
  let storage = getCookie("disclaimerStorage");
  if(!storage){
    cookieDisc.show();
  }

document.getElementById('disclaimer-storage').addEventListener('hide.bs.modal', function (event) {
  closeDisclaimerStorage();
});

  // check cookie 4 Language
  var lang = getCookie("chosenLang");
  if(!lang){
    document.getElementById('firstSelctionLang').style.display = 'flex';
  }

  // eventListener disclaimer cookie
  //document.getElementById("closeDisclaimer").addEventListener('click',closeDisclaimerStorage);

  // eventListener unsaved changes
  document.querySelector(".nav-link.create").addEventListener('click',function(event){
    event.preventDefault();
    newFlyer();
  });

  // eventListener cleanFlyer
 unsavedChanges = new bootstrap.Modal(document.getElementById('unsaved-changes'), {keyboard: false});

  document.getElementById("cleanStart").addEventListener('click',function(event){
    event.preventDefault();
    cleanFlyer(1);
    unsavedChanges.hide();
    });
  document.getElementById("backtoEdit").addEventListener('click',function(event){
    event.preventDefault();
    cleanFlyer(0);
    unsavedChanges.hide();
  });

  lastSave=currentFlyer();

  // eventListener edits on create-flyer values
  document.getElementById("titleInput").addEventListener('change', function(event){
    if($("#titleInput").val()!=lastSave.title){
      checkSave=false;
    }
  });
  document.getElementById("selectTemplate").addEventListener('change', function(event){
    if($("#selectTemplate").val()!=lastSave.template){
      checkSave=false;
    }
  });
  document.getElementById("colorInput").addEventListener('change', function(event){
    if($("#colorInput").val()!=lastSave.color){
      checkSave=false;
    }
  });
  document.getElementById("croppedImage").addEventListener('change', function(event){
    if($("#croppedImage").val()!=lastSave.img){
      checkSave=false;
    }
  });
  document.getElementById("whereInput").addEventListener('change', function(event){
    if($("#whereInput").val()!=lastSave.where){
      checkSave=false;
    }
  });
  document.getElementById("cover").addEventListener('change', function(event){
    if($("#whereInput").val()!=lastSave.where){
      checkSave=false;
    }
  });
  document.getElementById("dateInput").addEventListener('change', function(event){
    if($("#dateInput").val()!=lastSave.date){
      checkSave=false;
    }
  });
  document.getElementById("timeInput").addEventListener('change', function(event){
    if($("#timeInput").val()!=lastSave.time){
      checkSave=false;
    }
  });

  //eventListener AddBookmark
  document.getElementById("add-bookmarks").querySelector(".modal-footer").children[1].addEventListener('click',function(event){
    event.preventDefault();
    addBookmarktoStorage();
  });

  // Qrcode
  var qr = window.qr = new QRious({
      element: document.getElementById('qrious'),
      size: 1000,
      value: 'Cyclostyle'
    });

    shareModal = new bootstrap.Modal(document.getElementById('sharemodal'), {keyboard: false});
    copyModal = new bootstrap.Modal(document.getElementById('copymodal'), {keyboard: false});
    qrModal = new bootstrap.Modal(document.getElementById('qrmodal'), {keyboard: false});
    pannelli = new bootstrap.Carousel(document.getElementById('carousel-content'));

});

var finalSpace;

// tempObj for drafts
let tempObj = {};
let oldObj = "";

// checkSave variable & lastSave obj
let checkSave=true;
let lastSave;

function qrClick(e){
  var qr_result = document.getElementById('qrious');
   var download =document.getElementById('download-qr');
   qr.value = e.parentNode.getAttribute("data-value");
   console.log(e.parentNode.getAttribute("data-value"));
   download.setAttribute("href", qr_result.src);
   qrModal.show();
}



function shareLink(e) {
  var url_link = document.getElementById('share-url-text');
  var link_share= e.parentNode.getAttribute("data-value");
  if (navigator.share) {
   navigator.share({
      title: 'cyclostyle Share',
      url: link_share
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
        shareModal.show();
        url_link.textContent=link_share;
        url_link.parentNode.setAttribute("data-value", link_share);
    }
}

function copyLink (e) {
  copyText = e.parentNode.getAttribute("data-value");
  /* Copy the text inside the text field */
 navigator.clipboard.writeText(copyText);
 /* Alert the copied text */
 copyModal.show();
 setTimeout(function(){ copyModal.hide(); }, 1000);
}

function renderPreview()
{
    post = {};
    post.titleInput = $("#titleInput").val();
    post.template = $("#selectTemplate").val();
    post.colorInput = $("#colorInput").val();
    post.cropped = $("#croppedImage").attr("src");
    post.bodyTextarea = $(".richText-editor").first().text();
    post.whereInput = $("#whereInput").val();
    post.dateInput = $("#dateInput").val();
    post.timeInput = $("#timeInput").val();
    console.log(post);

    // save post to tempObj
    tempObj=post;

    fetch('./templates/default.html')
    .then((response) => response.text())
    .then((template) => {
      var rendered = Mustache.render(template, post);
      document.getElementById('flyer').innerHTML = rendered;
      finalSpace = rendered;
    });
}

async function sendInSpace()
{
    const cs_ipfs = await node.add(finalSpace);
    console.log(`https://ipfs.io/ipfs/${cs_ipfs.path}`);
}

// save to localStorage
function saveLocal(){
  if(tempObj!=oldObj){
    if(tempObj.titleInput!=''){
      tempObj.status='draft';
      console.log(tempObj);
      // append to localStorage
      position = findIntoStorage(tempObj.titleInput);
      tempObj=JSON.stringify(tempObj);
      if(position == -1)
      {
        localStorage.setItem(localStorage.length,tempObj);
        addToDraft(tempObj);
      }
      else
      {
        localStorage.setItem(position,tempObj);
      }
      oldObj = tempObj;
      checkSave=true;
      refreshDraft();
    } else { console.log("title vuoto")};
  } else { console.log("oggetto vuoto")};
}

function addToDraft(obj){
  let list=document.getElementById("page-drafts").getElementsByClassName("list-group")[0];
  const parser = new DOMParser();
  let parsedS= parser.parseFromString('<div class="list-group-item list-group-item-action"><h5 class="mb-1"><a href="#" class="edit-link">'+obj.titleInput+'</a></h5><small>'+obj.dateInput+": "+obj.timeInput+'</small><div class="d-flex w-100 justify-content-between"><div class="d-flex w-100 justify-content-start"><a href="#" class="action-btn ipfs" title="Print to Ipfs" data-bs-toggle="modal" data-bs-target="#ipfsmodal"></a><a href="#" class="action-btn preview preview-link"   onclick="retrieveInfo(\''+obj.titleInput+'\');previewDiv();renderPreview();" title="Preview"></a><a href="#" onclick="retrieveInfo(\''+obj.titleInput+'\');editDiv();" class="action-btn edit edit-link" title="Edit"></a></div><a href="#" class="action-btn delete" title="Delete" data-bs-toggle="modal" data-bs-target="#infomodal"></a></div></div>',"text/html");
  parsedS=parsedS.body.children[0];
  list.append(parsedS);
}

function addToBookmark(obj){
  let list=document.getElementById("page-bookmarks").getElementsByClassName("list-group")[0];
  const parser = new DOMParser();
  let parsedS= parser.parseFromString('<div class="list-group-item list-group-item-action"><h5><a href="'+obj.url+'" class="out-link" target="_blank">'+obj.title+'</a></h5><p class="mb-0">'+obj.date+'</p><small class="hash mb-1">'+obj.url+'</small><div class="d-flex justify-content-between"><div class="d-flex w-100 justify-content-start" data-value="'+obj.url+'"><a href="#" class="action-btn copy" onclick="copyLink(this)" title="Copy link"></a><a href="#" onclick="shareLink(this)" class="action-btn share share-button" title="Share"></a><a href="#" class="action-btn qrcode" onclick="qrClick(this)" title="Qrcode"></a><a href="'+obj.pdf+'" class="action-btn pdf" title="Download pdf" target="_blank"></a></div><a href="#" class="action-btn delete" title="Delete" data-bs-toggle="modal" data-bs-target="#infomodal"></a></div></div>',"text/html");
  parsedS=parsedS.body.children[0];
  list.append(parsedS);
  document.getElementById("titleaddInput").value='',
  document.getElementById("dateaddInput").value='',
  document.getElementById("urladdInput").value='',
  document.getElementById("pdfaddInput").value=''
};

function closeDisclaimerStorage(){
  //document.getElementById('disclaimer-storage').style.display='none';
  setCookie("disclaimerStorage","closed",365);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


/* function checkCookie(check){
  let cookie = document.cookie.split(";");
  if(cookie.includes(check)){
    return true;
  } else { return false; };
}*/

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

function findIntoStorage(key)
{
  for(let i=0;i<localStorage.length;i++){
    if(localStorage[i].includes('"titleInput":"'+key+'"')) return i;
  }
  return -1;
}

function retrieveInfo(text){
  let retrieved=JSON.parse(localStorage[findIntoStorage(text)]);
  console.log(retrieved);
  document.getElementById("titleInput").value=retrieved.titleInput;
  document.getElementById("selectTemplate").value=retrieved.template;
  document.getElementById("colorInput").value=retrieved.colorInput;
  document.getElementById("croppedImage").setAttribute("src",retrieved.cropped);
  document.getElementsByClassName("richText-editor")[0].textContent=retrieved.bodyTextarea;
  document.getElementById("whereInput").value=retrieved.whereInput;
  document.getElementById("dateInput").value=retrieved.dateInput;
  document.getElementById("timeInput").value=retrieved.timeInput;
  checkSave=false;
}


function refreshDraft(){
  let TBC= document.getElementById("page-drafts").getElementsByClassName("list-group")[0];
  TBC.innerHTML='';
  for(let i=0;i<localStorage.length;i++){
    let draftEl=JSON.parse(localStorage[i])
    addToDraft(draftEl);
  }
}

function newFlyer(){
  if(checkSave==false){
    unsavedChanges.show();
  } else {
    cleanFlyer(1);
  }
}

function cleanFlyer(ctr){
  if(ctr==1){
    document.getElementById("titleInput").value='';
    document.getElementById("selectTemplate").value='1';
    document.getElementById("colorInput").value='#0397BB';
    document.getElementById("croppedImage").setAttribute("src","");
    document.getElementById("croppedImage").parentElement.classList.add("hide");
    document.getElementById("cover").value=null;
    document.getElementsByClassName("richText-editor")[0].textContent='';
    document.getElementById("whereInput").value='';
    document.getElementById("dateInput").value='';
    document.getElementById("timeInput").value='';
    checkSave=true;
  }
  //let k = document.querySelectorAll(".carousel-inner")[0].children;
  //for(let i=0;i<k.length;i++){
  //  if(k[i].classList.contains("active")){
    //  k[i].classList.remove("active")
    //}};
  //k[0].classList.add("active");
  pannelli.to(0);
  if(document.querySelector("#content-flyer").style.display=='block'){
    $("#content-flyer").hide();
  }
  if(document.querySelector("#carousel-content").style.display=="none"){
    $("#carousel-content").show();
    $("#footer-create").show();
    $("#footer-preview").hide();
  }
  unsavedChanges.hide();
}

function currentFlyer(){
  return lastSave = {
    title:document.getElementById("titleInput").value,
    template:document.getElementById("selectTemplate").value,
    color:document.getElementById("colorInput").value,
    img:document.getElementById("croppedImage").attributes.src.value,
    upload:document.getElementById("cover").value,
    where:document.getElementById("whereInput").value,
    date:document.getElementById("dateInput").value,
    time:document.getElementById("timeInput").value
  };
};

function addBookmarktoStorage(){
  let bookmark = {
    title:document.getElementById("titleaddInput").value,
    date:document.getElementById("dateaddInput").value,
    url:document.getElementById("urladdInput").value,
    pdf:document.getElementById("pdfaddInput").value,
    status:'bookmark'
  },
  position = findIntoStorage(bookmark.title);
  tempBook=JSON.stringify(bookmark);
  console.log(bookmark);
  console.log(tempBook);
  if(position == -1)
  {
    localStorage.setItem(localStorage.length,tempBook);
  }
  else
  {
    localStorage.setItem(position,tempBook);
  }
  $("#addmodal").click();
  addToBookmark(bookmark);
}
