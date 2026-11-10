(function(root){
  'use strict';
  const SAVE_KEY='shrikeTycoonPrototype03Stable',BGM_KEY='shrikeTycoonBgmEnabled',RECOVERY_KEY='shrikeTycoonBeforeImportBackup';
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  const record=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
  const count=x=>Number.isSafeInteger(x)&&x>=0;
  function validateBackup(input){
    const backup=input?.format==='shrike-tycoon-backup'?input:{format:'shrike-tycoon-backup',formatVersion:1,values:{[SAVE_KEY]:JSON.stringify(input)}};
    if(backup.formatVersion!==1||!record(backup.values))throw Error('지원하지 않는 백업 파일입니다.');
    const values={};
    for(const key of Object.keys(backup.values)){
      if(![SAVE_KEY,BGM_KEY].includes(key)||typeof backup.values[key]!=='string')throw Error('백업 항목을 확인해 주세요.');
      values[key]=backup.values[key];
    }
    if(own(values,BGM_KEY)&&!['0','1'].includes(values[BGM_KEY]))throw Error('BGM 설정이 잘못되었습니다.');
    if(own(values,SAVE_KEY)){
      let s;try{s=JSON.parse(values[SAVE_KEY])}catch{throw Error('게임 기록 JSON을 읽지 못했습니다.')}
      if(!record(s)||!Number.isInteger(s.version)||s.version<1||s.version>11||!Number.isInteger(s.unlockedStage)||s.unlockedStage<1||s.unlockedStage>100||!count(s.xp)||!Array.isArray(s.unlockedShrikes)||s.unlockedShrikes.some(x=>typeof x!=='string'||x.length>80))throw Error('게임 기록을 확인해 주세요.');
      const fields=['version','unlockedStage','xp','unlockedShrikes','bestStars','bestScores','bestCombos','bestSubGoals','upgrades','discoveredBirds','stats','chefTraining','supplies'];
      if(Object.keys(s).some(k=>!fields.includes(k)))throw Error('지원하지 않는 게임 기록 항목입니다.');
      for(const field of ['bestStars','bestScores','bestCombos','upgrades','stats','bestSubGoals']){
        if(!own(s,field))continue;
        if(!record(s[field]))throw Error('기록 수치가 잘못되었습니다.');
        for(const [key,value] of Object.entries(s[field])){
          const stageMap=field.startsWith('best');
          const validKey=stageMap?/^(?:[1-9]|[1-9][0-9]|100)$/.test(key):field==='upgrades'?['branch','fire','perch'].includes(key):['plays','served','perfect','failed'].includes(key);
          if(!validKey||(field==='bestSubGoals'?typeof value!=='boolean':!count(value)))throw Error('기록 항목이나 수치가 잘못되었습니다.');
          if(field==='bestStars'&&value>3)throw Error('별점 기록을 확인해 주세요.');
          if(field==='upgrades'&&value>(key==='branch'?2:5))throw Error('업그레이드 기록을 확인해 주세요.');
        }
      }
      const chefs=['bull-headed','tiger','brown','chinese-grey','long-tailed','northern','grey-backed','isabelline','red-tailed','great-grey','red-backed'];
      for(const field of ['chefTraining','supplies']){
        if(!own(s,field))continue;
        if(!record(s[field]))throw Error('성장 기록을 확인해 주세요.');
        for(const [key,value] of Object.entries(s[field])){
          if(!(field==='chefTraining'?chefs:['tea','ember']).includes(key)||!count(value)||value>(field==='chefTraining'?4:9))throw Error('성장 수치가 잘못되었습니다.');
        }
      }
      if(own(s,'discoveredBirds')&&(!Array.isArray(s.discoveredBirds)||s.discoveredBirds.some(x=>typeof x!=='string'||x.length>80)))throw Error('도감 기록을 확인해 주세요.');
    }
    return {format:'shrike-tycoon-backup',formatVersion:1,gameVersion:'0.9.4',values};
  }
  function makeBackup(save,bgm){return validateBackup({format:'shrike-tycoon-backup',formatVersion:1,values:{[SAVE_KEY]:JSON.stringify(save),[BGM_KEY]:bgm?'1':'0'}})}
  function applyBackup(storage,input,currentBackup){
    const next=validateBackup(input),previous=validateBackup(currentBackup);
    if(!own(next.values,SAVE_KEY)||!own(previous.values,SAVE_KEY))throw Error('불러올 진행도가 없습니다.');
    const keys=[SAVE_KEY,BGM_KEY,RECOVERY_KEY],before=keys.map(k=>storage.getItem(k));
    try{
      storage.setItem(RECOVERY_KEY,JSON.stringify(previous));
      storage.setItem(SAVE_KEY,next.values[SAVE_KEY]);
      if(own(next.values,BGM_KEY))storage.setItem(BGM_KEY,next.values[BGM_KEY]);
    }catch(error){
      let failed=false;
      keys.forEach((k,i)=>{try{if(before[i]===null)storage.removeItem(k);else storage.setItem(k,before[i])}catch{failed=true}});
      throw Error(failed?'저장 공간 오류로 기록 복구를 확인해야 합니다. 기존 백업 파일을 보관해 주세요.':'기록을 저장하지 못했습니다. 기존 기록을 유지했습니다.');
    }
    return next;
  }
  const api={validateBackup,makeBackup,applyBackup,SAVE_KEY,BGM_KEY,RECOVERY_KEY};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.shrikeBackup=api;
})(typeof window==='undefined'?globalThis:window);
