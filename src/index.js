const music = require('./utils');
const muz = new music();
const PubSub = require('./helpers/pub_sub');
const JSONView = require('./views/jsonview');
const NoteNamesView = require('./views/notenamesview');
const ScaleNameView = require('./views/scalenameview');
const RomanView = require('./views/romanview');
const ScaleChooserView = require('./views/scalechooser');
const KeyboardView = require('./views/keyboardview');
const TonnetzView = require('./views/tonnetzview');

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const items = [
    //new JSONView("#scale"),
    new NoteNamesView("#notenames"),
    new KeyboardView("#keyboardwidget",muz),
    new ScaleNameView("#scalename"),
    new RomanView("#romanview"),
    new ScaleChooserView("#scalechooser",muz),
    new TonnetzView("#tonnetzwidget",muz)
  ];
  items.forEach((item) => {
    item.bindEvents();
  });
  PubSub.publish("message",{
    message: muz.getScale('c','major')
  });
  PubSub.publish("filterchordtypes", {
    message: muz.getScale('c','major'),
    filterchords:["major","minor","aug","dim"]
  });
  PubSub.publish("render",{});
});
