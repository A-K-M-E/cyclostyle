if ('serviceWorker' in navigator) { navigator.serviceWorker.register('../js/sw.js') .then(function(registration) { console.log('Registration successful, scope is:', registration.scope); }) .catch(function(error) { console.log('Service worker registration failed, error:', error); }); }

// forse tutto ciò va inserito all'evento del click del bottone, così si sposta in quel momento il problema

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
  // Qrcode
  const qr_link = document.querySelectorAll('.qrcode');

  var qr = window.qr = new QRious({
      element: document.getElementById('qrious'),
      size: 1000,
      value: 'QRious'
    });
    qr_link.forEach(function(item) {
    item.addEventListener('click', function(e) {
      var qr_result = document.getElementById('qrious');
      var download =document.getElementById('download-qr');
        qr.value = e.target.parentNode.getAttribute("data-value");
        download.setAttribute("href", qr_result.src);
      });
     });

  // Share
  const shareButton = document.querySelectorAll('.share-button');
  var url_link = document.getElementById('share-url-text');
  var shareModal = new bootstrap.Modal(document.getElementById('sharemodal'), {keyboard: false});

  shareButton.forEach(function(item) {
  item.addEventListener('click', function(e) {
    var link_share= e.target.parentNode.getAttribute("data-value");
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
  });
  });

  // Copy link
  var copyModal = new bootstrap.Modal(document.getElementById('copymodal'), {keyboard: false});
  const copylinkButton = document.querySelectorAll('.copy');

  copylinkButton.forEach(function(item) {
  item.addEventListener('click', function(e) {
    copyText = e.target.parentNode.getAttribute("data-value");
    /* Copy the text inside the text field */
   navigator.clipboard.writeText(copyText);
   /* Alert the copied text */
   copyModal.show();
   shareModal.hide();
  });
  });
  document.getElementById('copymodal').addEventListener('show.bs.modal', function (event) {
  setTimeout(function(){ copyModal.hide(); }, 1000);
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
      let draftEl=JSON.parse(localStorage[i])
      addToDraft(draftEl);
    }
    refreshEditListener();
  }

  // eventListener retrieveInfo on .edit-link

  let edit_link=document.getElementsByClassName("edit-link");
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
  }

  // check cookie 4 localStorage disclaimer
  const cookieDisc = document.getElementById("disclaimer-storage");
  let cookie = checkCookie("disclaimerStorage=closed");
  if(!cookie){
    cookieDisc.style.display="block";
  }

  // eventListener disclaimer cookie
  document.getElementById("closeDisclaimer").addEventListener('click',closeDisclaimerStorage);

  // eventListener unsaved changes
  document.querySelector(".nav-link.create").addEventListener('click',function(event){
    event.preventDefault();
    newFlyer();
  });

  // eventListener cleanFlyer
  document.getElementById("cleanStart").addEventListener('click',function(event){
    event.preventDefault();
    cleanFlyer(1)});
  document.getElementById("backtoEdit").addEventListener('click',function(event){
    event.preventDefault();
    cleanFlyer(0)});

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
});

var finalSpace;

// tempObj for drafts
let tempObj = {};
let oldObj = "";

// checkSave variable & lastSave obj
let checkSave=true;
let lastSave;

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
  let parsedS= parser.parseFromString('<div class="list-group-item list-group-item-action"><h5 class="mb-1"><a href="#" class="edit-link">'+obj.titleInput+'</a></h5><small>'+obj.dateInput+": "+obj.timeInput+'</small><div class="d-flex w-100 justify-content-between"><div class="d-flex w-100 justify-content-start"><a href="#" class="action-btn ipfs" title="Print to Ipfs" data-bs-toggle="modal" data-bs-target="#ipfsmodal"></a><a href="#" class="action-btn preview edit-link" title="Preview"></a><a href="#" class="action-btn edit" title="Edit"></a></div><a href="#" class="action-btn delete" title="Delete" data-bs-toggle="modal" data-bs-target="#infomodal"></a></div></div>',"text/html");
  parsedS=parsedS.body.children[0];
  list.append(parsedS);
}

function closeDisclaimerStorage(){
  document.getElementById('disclaimer-storage').style.display='none';
  const date = new Date();
  date.setTime(date.getTime()+8640000000);
  let expireDate = date.toUTCString();
  document.cookie = "disclaimerStorage=closed;expires="+expireDate;
}

function checkCookie(check){
  let cookie = document.cookie.split(";");
  if(cookie.includes(check)){
    return true;
  } else { return false; };
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
}

function refreshEditListener(){
  $('.edit-link').click(function(event){
    event.preventDefault();
    editDiv();
    $('.menu-create').show();
    $('.text-end').hide();
    $('#content-flyer').show();
    $('#croppedImage').parent().show();
});
}

function refreshDraft(){
  let TBC= document.getElementById("page-drafts").getElementsByClassName("list-group")[0];
  TBC.innerHTML='';
  for(let i=0;i<localStorage.length;i++){
    let draftEl=JSON.parse(localStorage[i])
    addToDraft(draftEl);
  }
  refreshEditListener();
}

function newFlyer(){
  if(checkSave==false){
    $("#unsaved-changes").show(2000);
  }
}

function cleanFlyer(ctr){
  if(ctr==1){
    document.getElementById("titleInput").value='';
    document.getElementById("selectTemplate").value='1';
    document.getElementById("colorInput").value='#0397BB';
    document.getElementById("croppedImage").setAttribute("src","");
    document.getElementById("croppedImage").style.display='none';
    document.getElementById("cover").value=null;
    document.getElementsByClassName("richText-editor")[0].textContent='';
    document.getElementById("whereInput").value='';
    document.getElementById("dateInput").value='';
    document.getElementById("timeInput").value='';
    checkSave=true;
  }
  let k = document.querySelectorAll(".carousel-inner")[0].children;
  for(let i=0;i<k.length;i++){
    if(k[i].classList.contains("active")){
      k[i].classList.remove("active")
    }};
  k[0].classList.add("active");
  if(document.querySelector("#content-flyer").style.display=='block'){
    $("#content-flyer").hide(2000);
  }
  $("#unsaved-changes").hide(2000);
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