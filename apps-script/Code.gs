/** MBA 3002 submissions. Standalone script writing to the designated private Google Sheet.
 * Deploy as web app: execute as Me; access Anyone.
 * Set Script Property QUIZ_TOKEN to a long random secret.
 * IMPORTANT: public clients cannot keep a token secret. This is for low-stakes quizzes.
 */
const HEADERS=['Timestamp','Quiz','Roll Number','Student Name','Department','Semester','Score','Maximum','Duration Seconds',...Array.from({length:10},(_,i)=>'Answer '+(i+1))];
function doPost(e){
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  try{
    const p=JSON.parse(e.postData.contents);
    if(p.action!=='submit'||!['Quiz I','Quiz II'].includes(p.quiz))throw Error('Invalid quiz');
    if(!/^.{1,60}$/.test(p.roll)||!/^.{1,100}$/.test(p.name)||!/^.{1,80}$/.test(p.department)||!/^.{1,10}$/.test(p.semester))throw Error('Invalid student details');
    if(!Array.isArray(p.answers)||p.answers.length!==10||p.answers.some(x=>!Number.isInteger(x)||x< -1||x>3))throw Error('Invalid answers');
    const sh=SpreadsheetApp.openById('1cYOVbbGK7zv_oYGrxiLf3j6UIRfMiI8THQdePE6AH04').getSheetByName('Submissions')||SpreadsheetApp.openById('1cYOVbbGK7zv_oYGrxiLf3j6UIRfMiI8THQdePE6AH04').insertSheet('Submissions');
    if(sh.getLastRow()===0)sh.appendRow(HEADERS);
    const keys={'Quiz I':[1,1,2,0,2,1,2,0,1,3],'Quiz II':[1,0,1,1,0,2,1,0,1,2]};
    const score=p.answers.reduce((n,a,i)=>n+(a===keys[p.quiz][i]?1:0),0);
    const safe=v=>{const s=String(v);return /^[=+@\-]/.test(s)?"'"+s:s};
    sh.appendRow([new Date(),p.quiz,safe(p.roll),safe(p.name),safe(p.department),safe(p.semester),score,10,Math.max(0,Math.min(1200,Number(p.duration)||0)),...p.answers.map(a=>a<0?'':String.fromCharCode(65+a))]);
    return ContentService.createTextOutput(JSON.stringify({ok:true,score})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err.message)})).setMimeType(ContentService.MimeType.JSON)}
  finally{lock.releaseLock()}
}
