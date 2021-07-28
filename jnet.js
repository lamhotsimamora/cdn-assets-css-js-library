/**
 * Raw     : https://raw.githubusercontent.com/lamhotsimamora/jnet/master/dist/js/jnet.js
 * Author  : @lamhotsimamora | { Jnet }
 * Updated April 2020
 * Copyright@2020
 */


function __isFunc(f) { var t = {}; return f && t.toString.call(f) === '[object Function]' }

function __dbg(message) {
    console.error('[jnet] ' + message);
}

function __typeOf(o) { return typeof o }

class _jnet {
    constructor(init) {
        let header = {
            content_type_json: 'application/json',
            content_type_form: 'application/x-www-form-urlencoded'
        }
        if (init, data = null) {
            this.header = init.header ? init.header : header.content_type_json;
            this.auto = (init.auto === undefined) ? true : init.auto;
            this.async = (init.async === undefined) ? true : init.async;
            this.result = null;

            if (__typeOf(init) === 'string') {
                this.url = init
                this.method = data.method ? data.method : 'GET'
                this.data = data.data ? data.data : null
                const obj = this;
                return new Promise(function(success) {
                    let xmlHttpRequest = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
                    xmlHttpRequest.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            success(this.responseText)
                        }
                    };
                    xmlHttpRequest.open(obj.method, obj.url, obj.async);
                    let header = (obj.header) ? (obj.header) : __init.content_type_json;
                    xmlHttpRequest.setRequestHeader('Content-Type', header);
                    xmlHttpRequest.send(obj.data.data)
                });
            } else if (__typeOf(init) === 'object') {
                this.url = init.url;
                this.method = init.method;
                this.data = init.data;
            }
        } else {
            __dbg('Kamu harus memasukkan data init');
        }
        return this;
    }

    async request(callback = null, error = null) {
        let method = this.method === undefined ? 'GET' : this.method;
        let url = this.url;
        let auto = this.auto;
        let form_data = null;

        if (url) {
            method = method.toUpperCase();
            if (method === 'POST') {
                let i = 0;
                for (let key in this.data) {
                    if (key === 'length' || !this.data.hasOwnProperty(key)) {
                        continue
                    }
                    let value = this.data[key];
                    (i == 0) ? form_data = key + '=' + value: form_data += '&' + key + '=' + value;
                    i++
                }
            }

            let xmlHttpRequest = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
            xmlHttpRequest.onreadystatechange = function() {

                if (auto == false) {
                    return callback(this);
                } else {

                    if (this.readyState == 4 && this.status == 200) {
                        if (callback != undefined && __isFunc(callback)) {
                            return callback(this.responseText, this)
                        } else {
                            return this.result = this.responseText
                        }
                    } else {
                        if (this.readyState == 4 && this.status == 404) {
                            return callback(JSON.stringify({ message: 'Not Found', status: 404 }), this)
                        }
                    }
                }
            };
            xmlHttpRequest.onerror = function() {
                if (__isFunc(error)) {
                    return error(this);
                }
            };
            try {
                await xmlHttpRequest.open(method, url, this.async);
                let header = (this.header) ? (this.header) : __init.content_type_json;
                await xmlHttpRequest.setRequestHeader('Content-Type', header);
                await xmlHttpRequest.send(form_data)
            } catch (error) {
                __dbg("error ajax request { " + method + " } -> " + error);
            }
            return this;
        }

    }
}

function jnet(init) {
    if (init) {
        return new _jnet(init)
    }
}