
const API=require("axios");
let CHANGE=10;//CMD.question("Enter % of Change\n");
(async()=>{
var data=await API.get('https://www.binance.com/bapi/margin/v1/public/isolated-margin/pair/all');
data=data.data;
//data=JSON.parse(data);
//data.data.map(x,i=>console.log(data.data[i].quote));
for(var i=0;i<data.data.length;i++){
var item=data.data[i];
var quote=data.data[i].quote;
if(quote=='USDT'){
getrec(item.base);
}

}

})()
async function getrec(base){
  try{
    var getprice=await API.get('https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-product-by-symbol?symbol='+base+'USDT');
    if(getprice.data.success){
    var priced=getprice.data.data;
    var open=priced.o;
    var high=priced.h;
    var current=priced.c;
    var calc=Number((high-current).toFixed(2));//*100;
    var change=Number(((current-open)/open)*100);
    change=Number(change.toFixed(2));
    var rec=recommend(calc,current);
    if(rec&&change>CHANGE){
    console.log(base,calc,change+'%',{current},{high},{open});}
    }
    }catch(e){//console.log("");
  }

}


function recommend(change,value){
if(value>10){
  if(change<0.3){return true}else{return false}
}
if(value<10&&value>5){
  if(change<0.2){return true}else{return false}
}
if(value>1&&value<5){
  if(change<0.1){return true}else{return false}
}
if(value<1&&value>0.75){
  if(change<0.05){return true}else{return false}
}
if(value<0.75&&value>0.5){
  if(change<0.03){return true}else{return false}
}
if(value>0.3&&value<0.5){
  if(change<0.025){return true}else{return false}
}
if(value>0.10&&value<0.3){
  if(change<0.015){return true}else{return false}
}
if(value>0.04&&value<0.1){
  if(change<0.01){return true}else{return false}
}
if(value<0){
  if(change<0.005){return true}else{return false}
}
return false;
}
