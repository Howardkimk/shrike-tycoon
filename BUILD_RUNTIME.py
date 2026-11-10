from pathlib import Path
import json,re,shutil
s=Path(__file__).resolve().parent;r=s.parent/'github-pages-0.9.6';r.mkdir(exist_ok=True)
a=json.loads((s/'ART_PROGRESS.json').read_text());c=json.loads((s/'CHEF_ART_PROGRESS.json').read_text())
paths=[x['asset'] for x in a['guests']]+[x['asset'] for x in c['chefs']]+[f'assets/pixel/world{i}.png' for i in range(1,11)]+['assets/cover.png','assets/icon-192.png','assets/icon-512.png','assets/audio/mosu_kushiyaki_shop.mp3','assets/fonts/Jua-Regular.ttf','assets/fonts/NotoEmoji.ttf','dist/game.js','save-backup.js','manifest.webmanifest']
for rel in paths:
 t=r/rel;t.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(s/rel,t)
h=re.sub(r'<link rel="stylesheet" href="[^"]+">','',(s/'index.html').read_text());h=h.replace('</head>','<link rel="stylesheet" href="styles.css"></head>');(r/'index.html').write_text(h)
css='\n'.join((s/f).read_text().replace('url("Jua-Regular.ttf")','url("assets/fonts/Jua-Regular.ttf")').replace('url("NotoEmoji.ttf")','url("assets/fonts/NotoEmoji.ttf")') for f in ['styles.css','assets/fonts/jua.css','assets/fonts/emoji.css','soft-game.css','guide-overhaul.css','woodland-0.9.6.css']);(r/'styles.css').write_text(css);(r/'.nojekyll').write_text('')
(r/'LICENSES.txt').write_text('Fonts: SIL Open Font License 1.1\n'+(s/'assets/fonts/Jua-OFL.txt').read_text()+'\n'+(s/'assets/fonts/NotoEmoji-OFL.txt').read_text()+'\nBGM: 야검유앵 / user-created モズさんの串焼き屋. Bird/chef/world art generated for this project.\n')
assets=['./']+['./'+str(p.relative_to(r)) for p in r.rglob('*') if p.is_file() and p.name not in ['sw.js','.nojekyll']]
sw=(s/'sw.js').read_text();sw=re.sub(r'const ASSETS=.*?;\n','const ASSETS='+json.dumps(assets)+';\n',sw,count=1);sw=re.sub(r'const CACHE=.*?;','const CACHE="shrike-tycoon-0.9.6-birds101";',sw,count=1);(r/'sw.js').write_text(sw)
sourceassets=['./']+['./'+x for x in paths]+['./index.html','./styles.css','./soft-game.css','./guide-overhaul.css','./woodland-0.9.6.css','./assets/fonts/jua.css','./assets/fonts/emoji.css']
ssw=re.sub(r'const ASSETS=.*?;\n','const ASSETS='+json.dumps(sourceassets)+';\n',(s/'sw.js').read_text(),count=1);ssw=re.sub(r'const CACHE=.*?;','const CACHE="shrike-tycoon-0.9.6-source-birds101";',ssw,count=1);(s/'sw.js').write_text(ssw)
files=[p for p in r.rglob('*') if p.is_file()];assert len(files)==136;assert all(p.stat().st_size<25*1024*1024 for p in files);print('Runtime:',len(files),'files')
