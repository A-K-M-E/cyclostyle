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
  for(let i=0;i<localStorage.length;i++){
    let draftEl=JSON.parse(localStorage[i+1])
    addToDraft(draftEl);
  }  
});

var finalSpace;

function renderPreview()
{
    post = {};
    post.titleInput = $("#titleInput").val();
    post.template = $("#selectTemplate").val();
    post.colorInput = $("#colorInput").val();
    post.cropped = $("#croppedImage").attr("src");
    post.bodyTextarea = $("#bodyTextarea").val();
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
      document.getElementById('page-create').innerHTML = rendered;    
      finalSpace = rendered;
    });
}

async function sendInSpace()
{
    const cs_ipfs = await node.add(finalSpace);
    console.log(`https://ipfs.io/ipfs/${cs_ipfs.path}`);
}

// tempObj for drafts

let tempObj = {};

// save to localStorage

function saveLocal(){

  tempObj=JSON.stringify(tempObj)
  // append to localStorage
  localStorage.setItem(localStorage.length+1,tempObj)
  tempObj={};
}

function addToDraft(obj){
  let list=document.getElementById("page-drafts").getElementsByClassName("list-group")[0];
  const parser = new DOMParser();
  let parsedS= parser.parseFromString('<div class="list-group-item list-group-item-action"><h5 class="mb-1"><a href="#" class="edit-link">'+obj.titleInput+'</a></h5><small>'+obj.dateInput+": "+obj.timeInput+'</small><div class="d-flex w-100 justify-content-between"><div class="d-flex w-100 justify-content-start"><a href="#" class="action-btn ipfs" title="Print to Ipfs" data-bs-toggle="modal" data-bs-target="#ipfsmodal"></a><a href="#" class="action-btn preview edit-link" title="Preview"></a><a href="#" class="action-btn edit" title="Edit"></a></div><a href="#" class="action-btn delete" title="Delete" data-bs-toggle="modal" data-bs-target="#infomodal"></a></div></div>',"text/html");
  parsedS=parsedS.body.children[0];
  list.append(parsedS);
}