import * as CryptoJS from "crypto-js";
import React, { Component } from "react";

export function Encrypt(data) {
  var jsonString = JSON.stringify(data);
  var key = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");
  var iv = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(jsonString),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return encodeURIComponent(encrypted);
}

export function decryptData(data) {
  var dataValue = decodeURIComponent(data);
  var key = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");
  var iv = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");

  var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var jsonString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  return jsonString;
}

export function CncdecryptData(data) {
  //var CryptoJS = require("crypto-js");
  var dataValue = decodeURIComponent(data);
  var key = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");
  var iv = CryptoJS.enc.Utf8.parse("MQ8wDQYDVQQHDAZN");

  var decrypted = CryptoJS.AES.decrypt(dataValue, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  //var jsonString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  var dstring = decrypted.toString(CryptoJS.enc.Utf8);
  return dstring;
}
