function httpGetAsync(theUrl, callback, method, data){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (callback) { //post might not have a callback
                callback(xmlHttp.responseText);
            }
        }
        else if(xmlHttp.readyState === 4){
            alertTop("danger", "Server Error: " + xmlHttp.statusMessage)
        }
    };
    //xmlHttp.withCredentials = true;
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("content-type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xmlHttp.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xmlHttp.send(JSON.stringify(data));
}
function uploadFile(url, callback, file){
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open("POST", url, true);
    //xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xhr.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Every thing ok, file uploaded
            if (callback){ //post might not have a callback
                callback(xhr.responseText);
            }
        }
        else if(xhr.readyState === 4){
            alertTop("danger", "Server Error: " + xhr.statusMessage)
        }
    };
    fd.append("upload_file", file);
    xhr.send(fd);
}
function uploadFiles(url, callback, file){
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open("POST", url, true);
    //xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xhr.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Every thing ok, file uploaded
            if (callback){ //post might not have a callback
                callback(xhr.responseText);
            }
        }
        else if(xhr.readyState === 4){
            alertTop("danger", "Server Error: " + xhr.statusMessage)
        }
    };
    fd.append("file_length", file.length);
    fd.append("upload_file", file[0]);
    for(let i = 1; i < file.length; i++){
        fd.append("upload_file_" + i, file[i]);
    }
    xhr.send(fd);
}
function uploadFileAndJSON(url, callback, file, data, method){
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open(method, url, true);
    //xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xhr.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Every thing ok, file uploaded
            if (callback){ //post might not have a callback
                callback(xhr.responseText);
            }
        }
        else if(xhr.readyState === 4){
            alertTop("danger", "Server Error: " + xhr.statusMessage)
        }
    };
    fd.append("file_length", file.length);
    fd.append("upload_file", file[0]);
    for(var i = 1; i < file.length; i++){
        fd.append("upload_file_" + i, file[i]);
    }
    fd.append("json", JSON.stringify(data));
    xhr.send(fd);

}
function uploadCommandFilesAndJSON(url, callback, file_dict, data){
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open("POST", url, true);
    //xhr.withCredentials = true;
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xhr.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Every thing ok, file uploaded
            if (callback){ //post might not have a callback
                callback(xhr.responseText);
            }
        }
        else if(xhr.readyState === 4){
            alertTop("danger", "Server Error: " + xhr.statusMessage)
        }
    };
    // add in our normal JSON data
    fd.append("json", JSON.stringify(data));
    // now add in all of our files by their param names
    for(let key in file_dict){
        fd.append("file" + key, file_dict[key])
    }
    xhr.send(fd);
}
function download_from_memory(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:octet/stream;charset=utf-8;base64,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function httpGetSync(theUrl){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.open( "GET", theUrl, false); //false means synchronous
    xmlHttp.setRequestHeader("content-type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xmlHttp.setRequestHeader("refresh_token", localStorage.getItem("refresh_token"));
    xmlHttp.send( null );
    return xmlHttp.responseText; // should just use this to get JSON data from RESTful APIs
}
function pythonToJSJson(string){
    let updated = string.replace(/\'/g, "\"");
    updated = updated.replace(/True/g, "true");
    updated = updated.replace(/False/g, "false");
    return updated;
}
function alertTop(type, string, delay=4){
    delay = delay * 1000;
    if( type === "danger" && delay === 4000){
        delay = 0;
    }
    toastr.options.timeOut = delay.toString();
    toastr.options.extendedTimeOut = delay.toString();
    if(type === "success"){
        toastr.success(string).css({"width": "100%", "min-width": "300px"});
    }else if(type === "danger"){
        toastr.error(string).css({"width": "100%", "min-width": "300px"});
    }else if(type === "info"){
        toastr.info(string).css({"width": "100%", "min-width": "300px"});
    }else{
        toastr.warning(string).css({"width": "100%", "min-width": "300px"});
    }
}
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "tapToDismiss": false,
  "toastClass" : 'toastr'
};

function toLocalTime(date){
    let init_date = new Date(date + " UTC");
    if("{{view_utc_time}}" === "True"){return date + " UTC";}
    return init_date.toDateString() + " " + init_date.toTimeString().substring(0,8);
}
function sort_table(th){
    //sort the table
    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
    const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
    let tr = th.parentElement;
    let table = th.parentElement.parentElement;
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr) );
    // deal with carets and the right directions
    let imgs_to_remove = th.parentElement.querySelectorAll("img");
    for(let i = 0; i < imgs_to_remove.length; i++){
        imgs_to_remove[i].remove();
    }
    let el = document.createElement('img');
    el.src = "/static/color-arrow.png";
    el.width = "32";
    el.height = "32";
    if(this.asc){
        el.style.transform = 'rotate(0deg)';
    }else{
        el.style.transform = 'rotate(180deg)';
    }
    th.appendChild(el);
}
function adjust_size(ta){
    let scroll_box = $('#' + ta.id);
    scroll_box.css('height', '3rem');
    let height = scroll_box.get(0).scrollHeight + 20;
    if(height > 800){height = 800;}
    scroll_box.css('height', height + "px");
}
function copyStringToClipboard(str) {
  // Create new element
  let el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
}
// Set our access token and referesh token in the session storage when we first log in
// this will be manually added to all GET/POST requests made to API calls
{% if access_token is defined %}
localStorage.setItem("access_token", "{{access_token}}");
{% endif %}
{% if refresh_token is defined %}
localStorage.setItem("refresh_token", "{{refresh_token}}");
window.location = "/";
{% endif %}

function refresh_access_token(){
    let refresh_token = localStorage.getItem("refresh_token");
    if(refresh_token !== null){
         httpGetAsync("{{http}}://{{links.server_ip}}:{{links.server_port}}/refresh" ,(response)=>{
             try{
                 let data = JSON.parse(response);
                 localStorage.setItem("access_token", data['access_token']);
             }catch(error){
                 console.log("failed to update access token...");
                 //alertTop("warning", "Failed to refresh access token");
             }
         }, "POST", {"refresh_token":refresh_token});
    }
}
setInterval(refresh_access_token, 300000); // update every 5min
