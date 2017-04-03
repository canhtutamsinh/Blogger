//Script by Aneesh of www.bloggerplugins.org
//Released on August 19th August 2009
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
function related_results_labels_thumbs(json) {
for (var i = 0; i < json.feed.entry.length; i++) {
var entry = json.feed.entry[i];
relatedTitles[relatedTitlesNum] = entry.title.$t;
try 
{thumburl[relatedTitlesNum]=entry.media$thumbnail.url;}


catch (error){
s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){
thumburl[relatedTitlesNum]=d;} else thumburl[relatedTitlesNum]='http://1.bp.blogspot.com/_u4gySN2ZgqE/SosvnavWq0I/AAAAAAAAArk/yL95WlyTqr0/s400/noimage.png';




}

if(relatedTitles[relatedTitlesNum].length>150) relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0, 150)+"...";
for (var k = 0; k < entry.link.length; k++) {
if (entry.link[k].rel == 'alternate') {
relatedUrls[relatedTitlesNum] = entry.link[k].href;
relatedTitlesNum++;


}
}
}
}
function removeRelatedDuplicates_thumbs() {
var tmp = new Array(0);
var tmp2 = new Array(0);
var tmp3 = new Array(0);
for(var i = 0; i < relatedUrls.length; i++) {
if(!contains_thumbs(tmp, relatedUrls[i])) 
{
tmp.length += 1;
tmp[tmp.length - 1] = relatedUrls[i];
tmp2.length += 1;
tmp3.length += 1;
tmp2[tmp2.length - 1] = relatedTitles[i];
tmp3[tmp3.length - 1] = thumburl[i];
}
}
relatedTitles = tmp2;
relatedUrls = tmp;
thumburl=tmp3;


}

function contains_thumbs(a, e) {
for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
return false;
}
function printRelatedLabels_thumbs(type) {
for(var i = 0; i < relatedUrls.length; i++)
{
if((relatedUrls[i]==currentposturl)||(!(relatedTitles[i])))
{
relatedUrls.splice(i,1);
relatedTitles.splice(i,1);
thumburl.splice(i,1);

}
}


var r = Math.floor((relatedTitles.length - 1) * Math.random());
var i = 0;

if(relatedTitles.length>0) document.write('<h2>'+relatedpoststitle+'</h2>');
document.write('<div style="clear: both;"/>');
while (i < relatedTitles.length && i < 20 && i<maxresults) {


document.write('<a style="text-decoration:none;float:left;');
if(i!=0) document.write('border-left:solid 0px #d4eaf2;"');
else document.write('"');
if (type == 'moblie') {
	var res = thumburl[r].replace("s72-c", "s1600");
	document.write(' href="' + relatedUrls[r] + '"><img style="width:100%;border:0px;" src="'+res+'"/><br/><div style="width:100%;padding-left:3px;border: 0pt none ; margin: 3px 0pt 0pt; padding: 0pt; font-style: normal; font-variant: normal; font-weight: bold; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal;">'+relatedTitles[r]+'</div></a>');
} else if (type == 'yeuonline') {
	var res = thumburl[r].replace("s72-c", "s200-c");
	document.write(' href="' + relatedUrls[r] + '"><img style="width:270px;border:0px;" src="'+res+'"/><br/><div style="width:273px;height:70px;border: 0pt none ; padding: 2pt; font-style: normal; font-variant: normal; font-weight: bold; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal;">'+relatedTitles[r]+'</div></a>');
} else {
	var res = thumburl[r].replace("s72-c", "s200-c");
	document.write(' href="' + relatedUrls[r] + '"><img style="width:240px;border:0px;" src="'+res+'"/><br/><div style="width:240px;height:70px;border: 0pt none ; padding: 0pt; font-style: normal; font-variant: normal; font-weight: bold; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal;">'+relatedTitles[r]+'</div></a>');
}


if (r < relatedTitles.length - 1) {
r++;
} else {
r = 0;
}
i++;
}
document.write('</div>');

}