if ('serviceWorker' in navigator) { navigator.serviceWorker.register('../js/sw.js') .then(function(registration) { console.log('Registration successful, scope is:', registration.scope); }) .catch(function(error) { console.log('Service worker registration failed, error:', error); }); }


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
  var url_link = document.getElementById('url');
  var shareModal = new bootstrap.Modal(document.getElementById('sharemodal'), {
  keyboard: false
});



  shareButton.forEach(function(item) {
  item.addEventListener('click', function(e) {
    var link_share= e.target.parentNode.getAttribute("data-value");
    if (navigator.share) {
     navigator.share({
        title: 'WebShare',
        url: link_share
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
      } else {
        console.log(link_share);
          shareModal.show();
          url_link.innerHTML=link_share;
          url_link.parentNode.setAttribute("data-value", link_share);
      }
  });
  });

  // Copy link

  var copyModal = new bootstrap.Modal(document.getElementById('copymodal'), {
  keyboard: false
});
  const copylinkButton = document.querySelectorAll('.copy');

  copylinkButton.forEach(function(item) {
  item.addEventListener('click', function(e) {
    copyText = e.target.parentNode.getAttribute("data-value");
    /* Copy the text inside the text field */
   navigator.clipboard.writeText(copyText);
   /* Alert the copied text */
   copyModal.show();
  });
  });
  document.getElementById('copymodal').addEventListener('show.bs.modal', function (event) {
  setTimeout(function(){ copyModal.hide(); }, 700);
  });
});
