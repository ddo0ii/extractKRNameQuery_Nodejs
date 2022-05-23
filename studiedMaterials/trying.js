const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const request = require("sync-request"); 
const officegen =  require("officegen");
const xlsx = officegen("xlsx");
var sheet=xlsx.makeNewSheet();
sheet.name="natureHealth";
var i = 0;
//const res = request('GET', url);
sheet.data[i]=[];

// let courses = [];

const getHTML = async(keyword) => {
    try {
        return await axios.get("https://www.nature.com/subjects/health-sciences/ncomms?searchType=journalSearch&sort=PubDate&page=" + keyword)
    } catch {
        console.log(err);
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $courseList = $(".cleared article");
        let first_name = [' Ka ', ' Ga ', ' Kah ', ' Kha ', ' Gha ', ' 간 ', ' Kan ', ' Gan ', ' Khan ', ' Kahn ', ' Kann ', ' 갈 ', ' Kal ', ' Gal ', ' Gar ', ' Karl ', ' 감 ', ' Kam ', ' Gam ', ' Kahm ', ' Kang ', ' Gahm ', ' 강 ', ' Kang ', ' Gang ', ' Khang ', ' Kahng ', ' Kwang ', ' Ghang ', ' Kaing ', ' 강전 ', ' Gangjeon ', ' Kangjun ', ' 개 ', ' Kae ', ' Gae ', ' 견 ', ' Gyeon ', ' Kyun ', ' Kyeon ', ' Kyoun ', ' Gyun ', ' Kyon ', ' 경 ', ' Gyeong ', ' Kyung ', ' Kyoung ', ' Kyeong ', ' Guong ', ' Gyeng ', ' 계 ', ' Kye ', ' Gye ', ' Kae ', ' Kay ', ' Keh ', ' Key ', ' Gae ', ' 고 ', ' Ko ', ' Go ', ' Koh ', ' Goh ', ' Kho ', ' Gho ', ' Koo ', ' 곡 ', ' Kok ', ' Gok ', ' Koock ', ' 공 ', ' Kong ', ' Gong ', ' Kohng ', ' Ghong ', ' Con ', ' Gohng ', ' Goung ', ' 곽 ', ' Kwak ', ' Gwak ', ' Kwag ', ' Kwack ', ' Gwag ', ' Koak ', ' Koag ', ' 관 ', ' Kwan ', ' Gwan ', ' 교 ', ' Kyo ', ' Gyo ', ' 구 ', ' Ku ', ' Gu ', ' Koo ', ' Goo ', ' Kuh ', ' Kou ', ' Khu ', ' 국 ', ' Kuk ', ' Guk ', ' Kook ', ' Gook ', ' Kug ', ' Cook ', ' Koog ', ' 군 ', ' Kun ', ' Gun ', ' Goon ', ' Koon ', ' 궁 ', ' Kung ', ' Gung ', ' Koong ', ' Goong ', ' Koung ', ' 궉 ', ' Gwok ', ' Kwok ', ' Kweok ', ' Kwoc ', ' 권 ', ' Kwŏn ', ' Gwon ', ' Kwon ', ' Kweon ', ' Kwun ', ' Gweon ', ' Kwan ', ' 근 ', ' Geun ', ' Keun ', ' Gun ', ' 금 ', ' Geum ', ' Keum ', ' Kum ', ' Gum ', ' Kuem ', ' Guem ', ' 기 ', ' Ki ', ' Gi ', ' Kee ', ' Key ', ' Kie ', ' Kih ', ' Gee ', ' 길 ', ' Kil ', ' Gil ', ' Gill ', ' Gihl ', ' Khil ', ' Keel ', ' Kill ', ' 김 ', ' Kim ', ' Gim ', ' Keem ', ' Ghim ', ' Kym ', ' Kin ', ' 나 ', ' Na ', ' Ra ', ' La ', ' Nah ', ' Rha ', ' Rah ', ' 난 ', ' Nan ', ' An ', ' 남 ', ' Nam ', ' Nahm ', ' Nham ', ' Nan ', ' Lam ', ' Narm ', ' 남궁 ', ' Namgung ', ' Namkung ', ' Namkoong ', ' Namgoong ', ' Namgoung ', ' Namkoung ', ' 낭 ', ' Nang ', ' Lang ', ' 내 ', ' Nae ', ' 노 ', ' No ', ' Noh ', ' Roh ', ' Ro ', ' Rho ', ' Nho ', ' 뇌 ', ' Noe ', ' Noi ', ' Lei ', ' 누 ', ' Nu ', ' 다 ', ' Ta ', ' Da ', ' 단 ', ' Tan ', ' Dan ', ' Dahn ', ' Dhan  ', ' 담 ', ' Tam ', ' Dam ', ' Tan ', ' 당 ', ' Tang ', ' Dang ', ' Dhang ', ' 대 ', ' Tae ', ' Dae ', ' Dai ', ' Dea ', ' 도 ', ' To ', ' Do ', ' Doh ', ' Dho ', ' Doe ', ' Toh ', ' Doo ', ' 독 ', ' Tok ', ' Dok ', ' 독고 ', ' Tokko ', ' Dokgo ', ' Dokko ', ' Dockko ', ' Dogko ', ' Dockgo ', ' Dohkgoh ', ' 돈 ', ' Ton ', ' Don ', ' 동 ', ' Tong ', ' Dong ', ' Dhong ', ' Doung ', ' 동방 ', ' Tongbang ', ' Dongbang ', ' 두 ', ' Tu ', ' Du ', ' Doo ', ' Do ', ' Dou ', ' Dow ', ' 등 ', ' Deung ', ' 등정 ', ' Deungjeong ', ' 라 ', ' Ra ', ' Na ', ' La ', ' Rha ', ' Rah ', ' Nah ', ' 란 ', ' Ran ', ' Lan ', ' 랑 ', ' Rang ', ' Nang ', ' 량 ', ' Ryang ', ' Lyang ', ' 려 ', ' Ryeo ', ' 렴 ', ' Ryeom ', ' 로 ', ' Ro ', ' Lo ', ' 뢰 ', ' Roe ', ' Loi ', ' 루 ', ' Ru ', ' Lu ', ' Lou ', ' Roo ', ' Ryu ', ' 류 ', ' Ryu ', ' Yoo ', ' Ryoo ', ' Yu ', ' You ', ' Lyu ', ' 륙 ', ' Ryuk ', ' 리 ', ' Ri ', ' 림 ', ' Rim ', ' Lim ', ' Im ', ' Reem ', ' 마 ', ' Ma ', ' Mah ', ' Mar ', ' Mach ', ' Mha ', ' 만 ', ' Man ', ' Mahn ', ' Mhan ', '  망절 ', ' Mangjeol ', ' Mangjul ', ' 매 ', ' Mae ', ' Mai ', ' Mea ', ' Mei ', ' 맹 ', ' Maeng ', ' Meang ', ' Mang ', ' Maing ', ' Meng ', ' Meing ', ' 명 ', ' Myeong ', ' Myung ', ' Myoung ', ' Myong ', ' Moung ', ' Myoeng ', ' 모 ', ' Mo ', ' Moh ', ' Mho ', ' Moo ', ' Moe ', ' Meo ', ' 목 ', ' Mok ', ' Mock ', ' Mog ', ' Mook ', ' Mork ', ' Mouk ', ' 묘 ', ' Myo ', ' 무 ', ' Mu ', ' 무본 ', ' Mubon ', ' 묵 ', ' Muk ', ' Mook ', ' Mok ', ' Moog ', ' 문 ', ' Mun ', ' Moon ', ' Mon ', ' Moun ', ' Muhn ', ' Moom ', ' 미 ', ' Mi ', ' Mee ', ' 민 ', ' Min ', ' Minn ', ' Mihn ', ' Meen ', ' Mheen ', ' Mean ', ' 박 ', ' Pak ', ' Bak ', ' Park ', ' Bark ', ' Pack ', ' Pag ', ' Baak ', ' Bahk ', ' 반 ', ' Pan ', ' Ban ', ' Bahn ', ' Van ', ' Bhan ', ' Barn ', ' Pahn ', ' 방 ', ' Pang ', ' Bang ', ' Bhang ', ' Bahng ', ' Barng ', ' Baang ', ' Fang ', ' 배 ', ' Pae ', ' Bae ', ' Bea ', ' Bai ', ' Pai ', ' Be ', ' Bay ', ' 백 ', ' Paek ', ' Baek ', ' Back ', ' Baik ', ' Paik ', ' Beak ', ' Baeg ', ' 번 ', ' Beon ', ' 범 ', ' Beom ', ' Bum ', ' Buhm ', ' Beum ', ' Bom ', ' Burm ', ' 변 ', ' Byeon ', ' Byun ', ' Byon ', ' Byoun ', ' Pyun ', ' Byen ', ' 보 ', ' Po ', ' Bo ', '  복 ', ' Pok ', ' Bok ', ' Bog ', ' Bock ', ' Pock ', ' Boc ', ' Bouk ', ' 봉 ', ' Pong ', ' Bong ,Vong ,부 ', ' Pu ', ' Bu ,Boo ', ' Poo ', ' Vu ', ' Booh ', ' Buh ', ' 비 ', ' Pi ', ' Bi ', ' Vy ', ' Vi ', ' Bie ', ' Bee ', ' 빈 ', ' Pin ', ' Bin ', ' Been ', ' Bhin ', ' Bean ', ' Vin ', ' Bihn ', ' 빙 ', ' Ping ', ' Bing ', ' 사 ', ' Sa ', ' Sha ', ' Sah ', ' Sar ', ' 사공 ', ' Sagong ', ' Sakong ', ' Shakong ', ' Sagoung ', ' Sagung ', ' 산 ', ' San ', ' 삼 ', ' Sam ', ' 상 ', ' Sang ', ' Shang ', ' Sahng ', ' Sarng ', ' 서 ', ' Seo ', ' Suh ', ' Su ', ' Sur ', ' So ', ' Sea ', ' 서문 ', ' Seomun ', ' Seomoon ', ' Suhmoon ', ' Seamoon ', ' Sumoon ', ' Semun ', ' 석 ', ' Seok ', ' Suk ', ' Seog ', ' Sok ', ' Suck ', ' Seuk ', ' 선 ', ' Seon ', ' Sun ', ' Son ', ' Shun ', ' Sen ', ' Suhn ', ' 선우 ', ' Seonu ', ' Sunwoo ', ' Seonwoo ', ' Sonu ', ' Sunoo ', ' Sunu ', ' 설 ', ' Seol ', ' Sul ', ' Seul ', ' Sol ', ' Sel ', ' Seal ', '  섭 ', ' Seop ', ' Seoub ', ' Sub ', ' Sup ', ' 성 ', ' Seong ', ' Sung ', ' Soung ', ' Seoung ', ' Seung ', ' Song ', ' 소 ', ' So ', ' Soh ', ' Sho ', ' Soo ', ' Seo ', ' Sou ', ' 소봉 ', ' Sobong ', ' 손 ', ' Son ', ' Sohn ', ' Shon ', ' Sun ', ' Soun ', ' Soon ', ' 송 ', ' Song ', ' Soung ', ' Shong ', ' Sohng ', ' Sung ', ' Seung ', ' 수 ', ' Su ', ' 순 ', ' Sun ', ' Soon ', ' 승 ', ' Seung ', ' Sung ', ' Seoung ', ' Seong ', ' Sheung ', ' Soeung ', ' 시 ', ' Si ', ' Shi ', ' See ', ' Sea ', ' Se ', ' 신 ', ' Sin ', ' Shin ', ' Sheen ', ' Sihn ', ' Shinn ', ' Synn ', ' 심 ', ' Sim ', ' Shim ', ' Sym ', ' Seem ', ' Sem ', ' Sihm ', ' 십 ', ' Sip ', ' 아 ', ' A ', ' Ah ', ' 안 ', ' An ', ' Ahn ', ' Ann ', ' Anh ', ' Ane ', ' Aun ', ' 애 ', ' Ae ', ' Ai ', ' 야 ', ' Ya ', ' Yha ', ' 양 ', ' Yang ', ' Ryang ', ' Yaung ', ' Young ', ' Yahng ', ' Yhang ', ' 어 ', ' Eo ', ' Uh ', ' Eoh ', ' Auh ', ' Eu ', ' Au ', ' 어금 ', ' Eogeum ', ' Eokum ', ' Eokeum ', ' Akeum ', ' Uhkum ', ' 엄 ', ' Eom ', ' Um ', ' Eum ', ' Uhm ', ' Aum ', ' Om ', ' Ohm ', ' 여 ', ' Yeo ', ' Yuh ', ' Yo ', ' Yu ', ' Yea ', ' Yeu ', ' 연 ', ' Yeon ', ' Youn ', ' Yun ', ' Yon ', ' Yeun ', ' Yeoun ', ' 염 ', ' Yeom ', ' Yum ', ' Youm ', ' Yeum ', ' Yom ', ' Yeoum ', ' 엽 ', ' Yeop ', ' Yub ', ' Yup ', ' Yop ', ' Youb ', ' Yeb ', ' 영 ', ' Yeong ', ' 예 ', ' Ye ', ' Yea ', ' Yae ', ' Yeh ', ' Yee ', ' Yei ', ' 오 ', ' O ', ' Oh ', ' Ou ', ' Ohe ', ' Oe ', ' Olh ', ' 옥 ', ' Ok ', ' Ock ', ' Og ', ' Ohk ', ' Oak ', ' Ouk ', ' 온 ', ' On ', ' Ohn ', ' Eon ', ' Onn ', ' Own ', ' Yon ', ' 옹 ', ' Ong ', ' Ohng ', ' Ohong ', ' Ung ', ' 완 ', ' Wan ', ' 왕 ', ' Wang ', ' Whang ', ' Woang ', ' Ywang ', ' Yang ', ' Whyang ', ' 요 ', ' Yo ', ' 용 ', ' Yong ', ' Young ', ' Lyong ', ' Yung ', ' Ryong ', ' Yeong ', ' 우 ', ' U ', ' Woo ', ' Wu ', ' Wo ', ' Ou ', ' Uh ', ' 운 ', ' Un ', ' Woon ', ' 원 ', ' Won ', ' Weon ', ' Woon ', ' One ', ' Wone ', ' Woun ', ' 위 ', ' Wi ', ' Wee ', ' We ', ' Wie ', ' Wei ', ' Wui ', ' 유 ', ' Yu ', ' Yoo ', ' You ', ' Ryu ', ' Ryoo ', ' Lyu ', ' 육 ', ' Yuk ', ' Yook ', ' Youk ', ' Yug ', ' Yuck ', ' Ryuk ', ' 윤 ', ' Yun ', ' Yoon ', ' Youn ', ' Yune ', ' Yeun ', ' Yon ', ' 은 ', ' Eun ', ' Un ', ' En ', ' Een ', ' Uhan ', ' Eyn ', ' 음 ', ' Eum ', ' Um ', ' Em ', ' Yum ', ' Ehum ', ' Ng ', ' 이 ', ' I ', ' Lee ', ' Yi ', ' Rhee ', ' Yee ', ' Rhie ', ' 인 ', ' In ', ' Ihn ', ' Yin ', ' Inn ', ' Leen ', ' Lin ', ' 임 ', ' Im ', ' Lim ', ' Yim ', ' Rim ', ' Leem ', ' Rhim ', ' 자 ', ' Cha ', ' Ja ', ' 장 ', ' Chang ', ' Jang ', ' Jhang ', ' Zhang ', ' Jahng ', ' Zang ', ' Jaung ', ' 장곡 ', ' Changgok ', ' Janggok ', ' 저 ', ' Jeo ', ' Cho ', ' Ji ', ' Chu ', ' Jo ', ' 전 ', ' Jeon ', ' Jun ', ' Chun ', ' Chon ', ' Jeun ', ' Cheon ', ' 점 ', ' Jeom ', ' Jum ', ' 정 ', ' Jeong ', ' Jung ', ' Chung ', ' Joung ', ' Chong ', ' Cheong ', ' Jong ', ' 제 ', ' Che ', ' Je ', ' Jae ', '  ', ' ea ', ' Jeh ', ' Jye ', ' Jee ', ' 제갈 ', ' Chegal ', ' Jegal ', ' Jekal ', ' Jaegal ', ' Jaekal ', ' Jeagal ', ' Jeakal ', ' 조 ', ' Cho ', ' Jo ', ' Joe ', ' Joh ', ' Jho ', ' Jou ', ' Zo ', ' 종 ', ' Chong ', ' Jong ', ' 좌 ', ' Chwa ', ' Jwa ', ' Joa ', ' Choa ', ' Chua ', ' Jua ', ' Chaw ', ' 주 ', ' Chu ', ' Ju ', ' Joo ', ' Choo ', ' Jou ', ' Zoo ', ' Zhu ', ' 준 ', ' Chun ', ' Jun ', ' June ', ' 즙 ', ' Jeup ', ' Chup ', ' 증 ', ' Jeung ', ' Zeng ', ' Tsang ', ' Duong ', ' Tseng ', ' Cheng ', ' 지 ', ' Chi ', ' Ji ', ' Jee ', ' Gi ', ' Gee ', ' Chee ', ' Jie ', ' 진 ', ' Chin ', ' Jin ', ' Jean ', ' Jhin ', ' Gin ', ' Chen ', ' Jeen ', ' 차 ', ' Cha ', ' Char ', ' Tcha ', ' Tchah ', ' Chah ', ' Tscha ', ' 창 ', ' Chang ', ' 채 ', ' Chae ', ' Chai ', ' Che ', ' Chea ', ' Cha ', ' Choi ', ' 천 ', ' Cheon ', ' Chun ', ' Chon ', ' Chen ', ' Choun ', ' Cheun ', ' 초 ', ' Cho ', ' Tcho ', ' 총 ', ' Chong ', ' 최 ', ' Choe ', ' Choi ', ' Choy ', ' Che ', ' Chai ', ' Chae ', ' Chey ', ' 추 ', ' Chu ', ' Choo ', ' Chou ', ' Cho ', ' Chue ', ' Chew ', ' 춘 ', ' Chun ', ' 쾌 ', ' Kwae ', ' 탁 ', ' Tak ', ' Tark ', ' Tag ', ' Tack ', ' Tahk ', ' Thak ', ' 탄 ', ' Tan ', ' Than ', ' Tahn ', ' Tran ', ' 탕 ', ' Tang ', ' 태 ', ' Tae ', ' Tai ', ' Tea ', ' Te ', ' Thae ', ' 판 ', ' Pan ', ' 팽 ', ' Paeng ', ' Paing ', ' Peang ', ' Pang ', ' Peng ', ' Phang ', ' 편 ', ' Pyeon ', ' Pyun ', ' Pyon ', ' Pyoun ', ' Pyen ', ' Pyeun ', ' 평 ', ' Pyeong ', ' Pyung ', ' Pyoung ', ' Pyong ', ' Pyeoung ', ' 포 ', ' Po ', ' 표 ', ' Pyo ', ' Phyo ', ' Poy ', ' Peo ', ' Pho ', ' Pou ', ' 풍 ', ' Pung ', ' Poong ', ' Poung ', ' 피 ', ' Pi ', ' Pee ', ' Phee ', ' Phi ', ' Pe ', ' Phie ', ' 필 ', ' Pil ', ' Phil ', ' Fil ', ' Peel ', ' 하 ', ' Ha ', ' Hah ', ' Har ', ' Hwa ', ' Haa ', ' Hagh ', ' 학 ', ' Hak ', ' 한 ', ' Han ', ' Hahn ', ' Hann ', ' Haan ', ' Khan ',
            ' Hwan ', ' 함 ', ' Ham ', ' Hahm ', ' Harm ', ' Hamm ', ' Haam ', ' Hwam ', ' 해 ', ' Hae ', ' 허 ', ' Heo ', ' Hur ', ' Huh ', ' Her ', ' Hu ', ' Ho ', ' 현 ', ' Hyeon ', ' Hyun ', ' Hyon ', ' Hyoun ', ' Hyen ', ' Hyeun ', ' 형 ', ' Hyeong ', ' Hyung ', ' Hyoung ', ' Hyong ', ' Hung ', ' Houng ', ' 호 ', ' Ho ', ' Hoh ', ' 홍 ', ' Hong ', ' Houng ', ' Heung ', ' Heong ', ' Whong ', ' Hohng ', ' 화 ', ' Hwa ', ' Wha ', ' Hoa ', ' Hua ', ' 환 ', ' Hwan ', ' 황 ', ' Hwang ', ' Whang ', ' Hoang ', ' Huang ', ' Hang ', ' Hawng ', ' 황목 ', ' Hwangmok ', ' 황보 ', ' Hwangbo ', ' Whangbo ', ' Hoangbo ', ' Hwangpo ', ' Whoangbo ', ' Howangbo ', ' 후 ', ' Hu ', ' Hou ', ' Hoo ', ' Hong ', ' Who ', ' Huu ', ' 흥 ', ' Heung ', ' Hong ', ' Huynh ', ' Khuong '];

    $courseList.each((idx,node) => {
        const naming1 = " " + $(node).find(".cleared > ul > li > span").eq(1).text() + " ";
        const naming2 = " " + $(node).find(".cleared > ul > li > span").eq(3).text() + " ";
        const naming3 = " " + $(node).find(".cleared > ul > li > span").eq(5).text() + " ";

        const contains = (target, pattern) => {
            let value = 0;
            pattern.forEach(function(word){
              value = value + target.includes(word);
            });
            return (value === 1)
        }

        if ((contains(naming1, first_name) == true) || (contains(naming2, first_name) == true) || contains(naming3, first_name) == true) {
            // courses.push({
            //     title: $(node).find(".extra-tight-line-height:eq(0)").text().replace(/\s+/, "").replace(/\s+$/g, "").replace(/\n/g, "").replace(/\r/g, ""),
            //     link: "https://www.nature.com" + $(node).find(".cleared > h3 > a").attr("href"),
            //     name1 : naming1.substr(1,naming1.length-2),
            //     name2 : naming2.substr(1,naming2.length-2),
            //     name3 : naming3.substr(1,naming3.length-2),
            //     time : $(node).find(".cleared > p > time").attr("datetime"),
            // });
            sheet.data[i].push(
                $(node).find(".extra-tight-line-height:eq(0)").text().replace(/\s+/, "").replace(/\s+$/g, "").replace(/\n/g, "").replace(/\r/g, ""),
                "https://www.nature.com" + $(node).find(".cleared > h3 > a").attr("href"),
                naming1.substr(1,naming1.length-2),
                naming2.substr(1,naming2.length-2),
                naming3.substr(1,naming3.length-2),
                $(node).find(".cleared > p > time").attr("datetime"),
            );
            i++;
        }
    });
    console.log(keyword + "페이지");
    // console.log(courses);
    sheet.setCell("A1","Title");
    sheet.setCell("B1","Link");
    sheet.setCell("C1","name1");
    sheet.setCell("D1","name2");
    sheet.setCell("E1","name3");
    sheet.setCell("F1","time");
    
    var strm = fs.createWriteStream("test.xlsx");
    xlsx.generate(strm);
}

for(let i=1, j=0; i<=2; i++, j++){
    setTimeout(() => {
        parsing(i);
    }, j * 1000);
    continue;
}