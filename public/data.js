export const groups=['奧林帕斯主神','《伊利亞德》','《奧德賽》'];
export const met='https://www.metmuseum.org/art/collection/search/251476';
export const gods='https://www.theoi.com/greek-mythology/olympian-gods.html';
export const book=(w,n)=>'https://www.theoi.com/Text/Homer'+(w===1?'Iliad':'Odyssey')+n+'.html';
export const people=[
['hermes','赫米斯','Hermes',[0,1,2],'眾神的使者。《伊利亞德》中，他護送普里阿摩斯進入希臘軍營。《奧德賽》中，他把宙斯的命令帶給卡呂普索。',[[1,24],[2,5]]],
['athena','雅典娜','Athena',[0,1,2],'智慧、戰略與工藝的女神。她在《伊利亞德》制止阿基里斯拔劍，也在《奧德賽》鼓勵忒勒瑪科斯出海尋父。',[[1,1],[2,1]]],
['zeus','宙斯','Zeus',[0,1,2],'掌管天空與雷霆的眾神之王。《伊利亞德》開篇，他答應忒提斯為阿基里斯討回榮譽。',[[1,1],[2,1]]],
['hera','赫拉','Hera',[0,1],'婚姻女神，也是宙斯的妻子。《伊利亞德》中，她支持希臘聯軍，並派雅典娜制止阿基里斯與阿伽門農的衝突。',[[1,1]]],
['apollo','阿波羅','Apollo',[0,1],'掌管預言、音樂與弓箭的神。《伊利亞德》開篇，他應祭司的祈禱，以瘟疫懲罰希臘聯軍。',[[1,1],[1,22]]],
['poseidon','波賽頓','Poseidon',[0,2],'掌管海洋與地震的神。奧德修斯刺瞎他的兒子波呂斐摩斯後，他阻撓奧德修斯返鄉。',[[2,1],[2,9]]],
['aphrodite','阿芙蘿黛蒂','Aphrodite',[0,1],'愛與美的女神。《伊利亞德》中，帕里斯與墨涅拉俄斯單挑時，她把帕里斯從戰場救走。',[[1,3]]],
['demeter','狄蜜特','Demeter',[0],'穀物、農耕與豐饒女神，也是珀耳塞福涅之母。女兒被帶往冥界後，她使大地停止生長，形成季節循環的核心神話。',[],'https://www.theoi.com/Olympios/Demeter.html'],
['ares','阿瑞斯','Ares',[0,1],'代表戰爭中暴烈與混亂一面的神。在《伊利亞德》中多次直接投入戰場，並被雅典娜與狄俄墨得斯擊退。',[[1,5]],'https://www.theoi.com/Olympios/Ares.html'],
['artemis','阿耳忒彌斯','Artemis',[0,1],'狩獵、荒野、少女與生育守護女神，阿波羅的孿生姊妹，常以弓箭、鹿與月亮意象辨識。',[[1,21]],'https://www.theoi.com/Olympios/Artemis.html'],
['hephaestus','赫菲斯托斯','Hephaestus',[0,1],'火、鍛造與工匠之神，為眾神打造武器與器物；《伊利亞德》中為阿基里斯鑄造新盔甲與盾牌。',[[1,18]],'https://www.theoi.com/Olympios/Hephaistos.html'],
['hestia','赫斯提亞','Hestia',[0],'爐灶、家庭與城邦祭火女神。她較少參與戲劇性衝突，但在家庭與公共祭儀中占有核心位置。',[],'https://www.theoi.com/Ouranios/Hestia.html'],
['dionysus','戴歐尼修斯','Dionysus',[0],'葡萄酒、狂喜、戲劇與變形之神，常與葡萄藤、酒杯、常春藤、豹與隨從薩堤爾一同出現。',[],'https://www.theoi.com/Olympios/Dionysos.html'],
['hades','黑帝斯','Hades',[0,2],'冥界之王，宙斯與波賽頓的兄弟，也是珀耳塞福涅的丈夫；掌管亡者國度而非死亡本身。',[[2,11]],'https://www.theoi.com/Khthonios/Haides.html'],
['persephone','珀耳塞福涅','Persephone',[0,2],'冥界之后與春季重生女神。她往返於母親狄蜜特與冥界之間的神話，解釋了大地的枯榮循環。',[[2,11]],'https://www.theoi.com/Khthonios/Persephone.html'],
['chaos','卡俄斯','Chaos',[0],'宇宙創生之初的裂隙或虛空。赫西俄德《神譜》以卡俄斯作為最早出現的原初存在之一。',[],'https://www.theoi.com/Protogenos/Khaos.html'],
['nyx','倪克斯','Nyx',[0],'夜的原初女神，從卡俄斯而生；在赫西俄德譜系中，她生出睡眠、死亡、命運等多位擬人神。',[],'https://www.theoi.com/Protogenos/Nyx.html'],
['erebus','厄瑞玻斯','Erebus',[0],'幽暗的原初神，也是冥界深處黑暗的擬人化存在；與倪克斯共同生出太空與白晝。',[],'https://www.theoi.com/Protogenos/Erebos.html'],
['gaia','蓋亞','Gaia',[0],'大地的原初女神，生出烏拉諾斯並與其孕育泰坦、獨眼巨人與百臂巨人，是多條神祇譜系的根源。',[],'https://www.theoi.com/Protogenos/Gaia.html'],
['uranus','烏拉諾斯','Uranus',[0],'天空的原初神，由蓋亞所生並與她結合；遭克羅諾斯推翻後，泰坦世代取得統治。',[],'https://www.theoi.com/Protogenos/Ouranos.html'],
['cronus','克羅諾斯','Cronus',[0],'泰坦神王，推翻父親烏拉諾斯，又因預言吞下自己的子女，最後被宙斯率領的新神世代推翻。',[],'https://www.theoi.com/Titan/TitanKronos.html'],
['rhea','瑞亞','Rhea',[0],'泰坦女神、克羅諾斯之妻，也是赫斯提亞、狄蜜特、赫拉、黑帝斯、波賽頓與宙斯之母。',[],'https://www.theoi.com/Titan/TitanisRhea.html'],
['achilles','阿基里斯','Achilles',[1],'希臘聯軍的戰士。他與阿伽門農決裂後退出戰鬥，直到帕特羅克洛斯戰死才重返戰場。',[[1,1],[1,16],[1,22]]],
['hector','赫克托耳','Hector',[1],'特洛伊王子，也是守城的主將。他殺死帕特羅克洛斯，後來在城外與阿基里斯決鬥。',[[1,6],[1,16],[1,22]]],
['patroclus','帕特羅克洛斯','Patroclus',[1],'阿基里斯最親近的戰友。他穿上阿基里斯的盔甲出戰，原本要救援被逼到船邊的希臘聯軍。',[[1,16]]],
['agamemnon','阿伽門農','Agamemnon',[1],'希臘聯軍的統帥。他奪走阿基里斯的戰俘布里塞伊絲，引發史詩開篇的衝突。',[[1,1]]],
['odysseus','奧德修斯','Odysseus',[1,2],'伊薩卡的國王。特洛伊戰爭後，他在海上漂泊多年，返家後化裝成乞丐，觀察宮中的求婚者。',[[2,1],[2,9],[2,16]]],
['penelope','潘妮洛佩','Penelope',[2],'奧德修斯的妻子。她白天織布、夜裡拆線，以遲遲織不完的裹屍布拖延再婚。',[[2,2],[2,23]]],
['telemachus','忒勒瑪科斯','Telemachus',[2],'奧德修斯與潘妮洛佩的兒子。他在雅典娜鼓勵下出海打聽父親的消息。',[[2,1],[2,16]]],
['circe','喀耳刻','Circe',[2],'住在艾艾亞島的女神。她把奧德修斯的部分船員變成豬，後來恢復他們的人形，並指引奧德修斯前往冥界。',[[2,10]]],
['calypso','卡呂普索','Calypso',[2],'住在奧吉吉亞島的女神。她把奧德修斯留在島上多年，直到赫爾墨斯帶來宙斯的命令才讓他離開。',[[2,5]]],
['polyphemus','波呂斐摩斯','Polyphemus',[2],'波賽頓的兒子，也是獨眼巨人。他困住奧德修斯一行人，遭刺瞎後向父親祈求報復。',[[2,9]]]
];
export const events=[
[1,1,'阿基里斯與阿伽門農決裂，雅典娜阻止阿基里斯拔劍。'],
[1,6,'赫克托耳在特洛伊城內與安德洛瑪刻道別。'],
[1,16,'帕特羅克洛斯借用阿基里斯的盔甲出戰，在戰場上陣亡。'],
[1,22,'阿基里斯在特洛伊城外殺死赫克托耳。'],
[2,9,'奧德修斯一行遇見波呂斐摩斯。'],
[2,10,'喀耳刻恢復船員的人形，後來指引奧德修斯前往冥界。'],
[2,1,'雅典娜化身門忒斯，鼓勵忒勒瑪科斯打聽父親的消息。'],
[2,5,'奧德修斯獲准離開卡呂普索的島。'],
[2,16,'奧德修斯向忒勒瑪科斯表明身分。'],
[2,23,'潘妮洛佩以婚床的秘密確認奧德修斯的身分。']
];
export const relations=[
['athena','鼓勵他尋父','telemachus'],['athena','協助返鄉','odysseus'],['athena','阻止他拔劍','achilles'],
['zeus','夫妻','hera'],['achilles','親近戰友','patroclus'],['achilles','戰場上的對手','hector'],
['agamemnon','爭執後分道揚鑣','achilles'],['odysseus','夫妻','penelope'],['odysseus','父子','telemachus'],['penelope','母子','telemachus'],
['poseidon','父子','polyphemus'],['poseidon','阻撓返鄉','odysseus'],['calypso','將他留在島上','odysseus'],['circe','指引他前往冥界','odysseus']
,[ 'chaos','生出','nyx'],['chaos','生出','erebus'],['nyx','伴侶','erebus'],['gaia','生出並結合','uranus'],['gaia','父母','cronus'],['uranus','父母','cronus'],['cronus','夫妻','rhea'],['cronus','父親','zeus'],['rhea','母親','zeus'],['cronus','父親','hera'],['rhea','母親','hera'],['cronus','父親','poseidon'],['rhea','母親','poseidon'],['cronus','父親','hades'],['rhea','母親','hades'],['demeter','母女','persephone'],['hades','夫妻','persephone'],['zeus','父女','athena'],['zeus','父子','apollo'],['zeus','父女','artemis'],['zeus','父子','ares'],['zeus','父子','hermes'],['zeus','父子','dionysus']
];
