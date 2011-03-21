// グローバル変数
var map;
var ckOverKiban;
var withOverKiban;


var tmsLayers = [
  "http://www.finds.jp/independent/tohoku/tms/1.0.0/CTO-2010-7X-ortho-R6-N-merge/",
  "http://www.finds.jp/independent/tohoku/tms/1.0.0/CTO-2010-4-ortho-ishinomaki-merge/",
  "http://www.finds.jp/independent/tohoku/tms/1.0.0/CTO-2010-4-ortho-merge/",
  "http://www.finds.jp/independent/tohoku/tms/1.0.0/CTO-2010-7X-ortho-R6-S-merge/"
];

function getTmsLayerTileUrl(id, coord, zoom) {
  var ymax = 1 << zoom;
  var y = ymax - coord.y -1;
  var ret =  tmsLayers[id] + zoom + "/" + coord.x + "/" + y + ".png";
  return ret;
}

var overKiban = new google.maps.ImageMapType({
  getTileUrl: function(coord, zoom) {
    var ymax = 1 << zoom;
    var y = ymax - coord.y -1;
    var ret = "http://www.finds.jp/ws/kiban25000gwc.cgi?VERSION=1.1.1&REQUEST=GetMap&" +
        "STYLES=&SRS=EPSG:900913&" +
        "BBOX=" + getBBox(coord,zoom) + "&" +
        "WIDTH=256&HEIGHT=256&FORMAT=image/png&" +
        "LAYERS=kiban25000:AllB";
    return ret;
  },
  tileSize: new google.maps.Size(256, 256),
  isPng: true
});

// 初期化
function photo201103mapInit() {
  var photo201103MapType = [];

    photo201103MapType.push(
      new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) { return getTmsLayerTileUrl(0, coord, zoom)},
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
      })
    );

    photo201103MapType.push(
      new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) { return getTmsLayerTileUrl(1, coord, zoom)},
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
      })
    );

    photo201103MapType.push(
      new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) { return getTmsLayerTileUrl(2, coord, zoom)},
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
      })
    );

    photo201103MapType.push(
      new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) { return getTmsLayerTileUrl(3, coord, zoom)},
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
      })
    );

  map = new google.maps.Map(
      document.getElementById("map"), {
        zoom: 8,
        center: new google.maps.LatLng(38.2, 140.9),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    );

  for( var n = 0; n < photo201103MapType.length; n++ ) {
    map.overlayMapTypes.push( photo201103MapType[n]);
  }

  // チェックボックス
  ckOverKiban = document.createElement('input');
  ckOverKiban.type = "checkbox";
  ckOverKiban.onclick = changeOverKiban;
  var form = document.createElement('form');
  form.style.fontSize = '0.75em';
  form.action = "javascript:void(0)";
  form.style.border = 'solid 1px #000';
  form.style.marginTop = '0.25em';
  form.style.padding = '0.125em';
  form.style.background = '#fff';
  form.appendChild(ckOverKiban);
  var span = document.createElement('span');
  span.innerHTML = '基盤地図オーバレイ';
  form.appendChild(span);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(form);
  // 著作権
  var div = document.createElement('div');
  div.className = 'foot';
  div.innerHTML = "<a href=\"http://www.finds.jp/wsdocs/kibanwms/index.html.ja\">基盤地図情報 WMS配信サービス(平20業使、第449号)</a>, 空中写真: <a href=\"http://www.gsi.go.jp/\">国土地理院</a>提供";
  map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(div);

  // 基盤地図
  this.changeOverKiban();

}

function changeOverKiban() {
  if( ckOverKiban.checked ) {
    if( !withOverKiban ) {
      map.overlayMapTypes.push(overKiban);
      withOverKiban = true;
    }
  }
  else {
    if( withOverKiban ) {
      map.overlayMapTypes.pop();
      withOverKiban = false;
    }
  }
}

// タイルに対応したBBox文字列 "minx,miny,maxx,maxy"
function getBBox(tile,zoom) {
  var pxs = 256 * (1 << zoom);
  var pxsh = pxs / 2;
  var mtr = 40075017;
  var mpp = mtr/pxs;
  var x1 = (tile.x*256-pxsh) * mpp;
  var x2 = ((tile.x*256+256)-pxsh) * mpp;
  var y2 = (pxsh-tile.y*256) * mpp;
  var y1 = (pxsh-(tile.y*256+256)) * mpp;
  return x1 + "," + y1 + "," + x2 + "," + y2;
}

var initFunctionArray = [photo201103mapInit];

function init() {
  if( initFunctionArray ) {
    for( var n = 0; n < initFunctionArray.length; n++ ) {
      var fnc = initFunctionArray[n];
      fnc();
    }
  }

}

window.onload = init;
