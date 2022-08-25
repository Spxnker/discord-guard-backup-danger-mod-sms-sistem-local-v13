'use strict';

const { Client, Permissions, MessageEmbed, TextChannel, Guild } = require("discord.js");
const Vonage = require('@vonage/server-sdk');
 const client = new Client();
const fs = require("fs");
const DATA = require("./local/DATA.json");
 let Saves = new Map();
var Tokens = require("./local/Tokens.json").Tokens
 client.RoleArray = []
client.ChannelArray = [];
client.Danger = true;
 client.raids = { permissions:[] };
client.Members = [];

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
function randomClient() {
  return Object.values(clientObject).random();
};
class CLIENT {
  constructor(token) {
    this.token = token;
    this.client = new Client();
    this.client.login(token).then(x => console.log(`${this.client.user.tag} Rol Dagıtıcıları Açtım.`));
  }
};



function createClient(token) {
  let Creator = new CLIENT(token)
  return Creator.client;
};

let clientObject = {}
for (var i = 0; i < Tokens.length || []; i++) {
  let c = createClient(Tokens[i])
  clientObject[i] = c
};

Array.prototype.shuffle = function () {
  let i = this.length;
  while (i) {
    let j = Math.floor(Math.random() * i);
    let t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};



 client.spankMe = { 
     myArray: client.raids,
     spankerPush(...myArray){
   return this.myArray.push(...myArray)
     },
     spankGet(Index){
         return this.myArray[Index]
     },
     spankMaps(fonksiyon){
         return [...this].reduce((call ,value, index)=>{
             call[index] = fonksiyon(value, index, [...this]);
             if(call.length && index > 0 && Math.random() > 0.7 ) [call[index - 1],call[index]] = [call[index],call[index - 1]]
             return call;
         }, []);
     }
  };

  const present = {
    guildID: "889535763522388008",
    botOwners: ["817747393025015828"],
    botPrefix : "s!",
    botToken: "",
    logID: "892761796090408981",
    sender: "817747393025015828",


    NEXMO_API_KEY: "",
    NEXMO_API_SECRET: "",
    PhoneNumber: "",
    VirtualNumber: ""
};

const nullandSpanker = new Vonage({ 
  apiKey: present.NEXMO_API_KEY, 
  apiSecret: present.NEXMO_API_SECRET
}); 


async function sitile(){
const sunucu = client.guilds.cache.get(present.guildID);
const dataRol = JSON.parse(fs.readFileSync("./local/DATA.json", "utf8"));
let ObjectRol = JSON.stringify(dataRol)

await sunucu.roles.cache.filter(x => x.name !== "@everyone" && !x.managed).forEach(async (rol) => {
const rolKanal = [];

sunucu.channels.cache.filter(x => x.permissionOverwrites.has(rol.id)).forEach(async function(x){
var izin = x.permissionOverwrites.get(rol.id);
let items = { id: x.id, allow: izin.allow.toArray(), deny: izin.deny.toArray() } 
rolKanal.push(items);
});


let dataRolUye = await rol.members.map(spanker => spanker.id)  
if(!dataRol) dataRol = {};
dataRol[rol.id] = {
    id: rol.id,
    isim: rol.name,
    uyeler: dataRolUye,
    perms: rol.permissions,
    position2: rol.rawPosition,
    hoist: rol.hoist,
    editlimi: rol.editable,
    hexColor: rol.hexColor,
    color: rol.color,
    mention: rol.mentionable,
    kanalIzin: rolKanal
}
fs.writeFileSync("./local/DATA.json", JSON.stringify(dataRol));

});
console.log("Rolleri Yedekledim.")
};

async function kanalss(){
const sunucu = client.guilds.cache.get(present.guildID);
await sunucu.channels.cache.forEach(async function(ch){
let x = ch.permissionOverwrites.map(async function(x){
return {
id: x.id,
allow: new Permissions(x.allow.bitfield).toArray(),
deny: new Permissions(x.deny.bitfield).toArray(),
type: x.type
}
})
client.raids.permissions = [];

await client.raids.permissions.push(x)
});
console.log("Kanal Izın function")
}

function deleteAll(){
let x = {}
delete DATA["id"];
delete DATA["isim"]
delete DATA["uyeler"]
delete DATA["perms"]
delete DATA["color"]
delete DATA["mention"]
delete DATA["position2"]
delete DATA["editlimi"]
delete DATA["hexColor"]
delete DATA["hoist"]
delete DATA["kanalIzin"]

console.log("Database ayarlandı.")
}

client.on("roleDelete", async function(role){
  let nullandSpanker = `${role.name} ${role.id} Rolü Silindi! daha fazlası için denetim kaydına bak!` 
  nullandSpanker.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankerLogMessaj, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }
    }
  })
client.Danger = true;
let spankerDatabase = JSON.parse(fs.readFileSync("./local/DATA.json", "utf8"));
await client.RoleArray.push(role.id);
if(client.RoleArray.length > 3) return client.members.cache.get(present.sender).send(client.RoleArray + " " + "Kurulacak Roller!")
let spankEmb = new MessageEmbed().setColor(`GOLD`).setTimestamp().setFooter(`Spanker Always Watching!`);
client.channels.cache.get(present.logID).send(spankEmb.setTitle(`Rol Silindi!`).setDescription(`\n❯ Rol Adı: ${role.name} (ID: ${role.id})\n❯ Bu role ait veritabanında ` + " "+ spankerDatabase[role.id].uyeler.length + " "+ `üye bulundu!\n❯ Kurulum için \`${present.botPrefix}rolkur <rol ID>\` komutunu kullanabilirsiniz.`))
});

client.on("channelDelete", async function(channel){
client.channels.cache.get(present.logID).send(`Kanal silindi: ${channel.name} ${channel.id}`);
await client.ChannelArray.push(channel.id);
client.Danger = true;
if(client.ChannelArray.length > 3) return client.members.cache.get(present.sender).send(client.ChannelArray + " " + "Silinen Kanallar!");
//client.ChannelArray = [];
})

client.on("message", async message => {
    if (message.author.bot ||!message.content.toLowerCase().startsWith(present.botPrefix)) return;
    if (!present.botOwners.includes(message.author.id)) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(present.botPrefix.length);
    let spankEmb = new MessageEmbed().setColor(`GOLD`).setTimestamp().setFooter(`Spanker Always Watching!`);
    if(!args[0]) return message.channel.send(spankEmb.setDescription(`>>> Bir rol ID'si girmeyi unuttunuz.`))
    if(command == "spankur"){
        
        let spankerDatabase = JSON.parse(fs.readFileSync("./local/DATA.json", "utf8"));
        let _kur = spankerDatabase[args[0]];
        
        if(!_kur) return message.channel.send(`${args[0]} ID'li rol bulunamadı!`)
        let memberSize = spankerDatabase[args[0]].uyeler.length;
        if(memberSize == 0){
         client.Danger = true;

            let yeni = await message.guild.roles.create({data:{
                name: _kur.isim,
                color: _kur.color,
                permissions: _kur.perms,
                position: _kur.position2,
                mentionable: _kur.mention,
                hoist: _kur.hoist,
                editable: _kur.editlimi
            }});
         let kanalizin = _kur.kanalIzin
         if(kanalizin){
        kanalizin.forEach(async function(permission, index){
        let channel = message.guild.channels.cache.get(permission.id);
        if(!channel) return;
        setTimeout(async function(){
        let assign = {};
         permission.allow.forEach(x => {
        assign[x] = true;
        });
        permission.deny.forEach(x => {
        assign[x] = false; 
        });
        channel.createOverwrite(yeni, assign);
        }, index*2250)

        })
       
        }
          await message.channel.send(spankEmb.setDescription(`**❯ Eski ID'si : (${_kur.id}) olan eski rölü => Yeni olarak <@&${yeni.id}> (${yeni.id}) güncelledim.**\n\n**❯ Kanal izinleri yeni role entegre ediliyor!**\n\n❯ \`Ancak rolde herhangi bir üye bulunamadı.\``))
        }else{
            client.Danger = true;
            let yeni = await message.guild.roles.create({data:{
                name: _kur.isim,
                color: _kur.color,
                permissions: _kur.perms,
                position: _kur.position2,
                mentionable: _kur.mention,
                hoist: _kur.hoist,
                editable: _kur.editlimi
            }}).then(async function(rolEkle){
                
                for(let eklencek of _kur.uyeler){
                    let cagir = message.guild.members.cache.get(eklencek);
                    if(cagir == null) return console.log(`Uye sunucuda yok vermiyorum`) 
                    else{
                        setInterval(async () => {
                            await cagir.roles.add(rolEkle);
                        }, 1300);
                    }
                };
  let kanalizin = _kur.kanalIzin
         if(kanalizin){
        kanalizin.forEach(async function(permission, index){
        let channel = message.guild.channels.cache.get(permission.id);
        if(!channel) return;
        setTimeout(async function(){
        let assign = {};
         permission.allow.forEach(x => {
        assign[x] = true;
        });
        permission.deny.forEach(x => {
        assign[x] = false; 
        });
        channel.createOverwrite(rolEkle, assign);
        }, index*2250)

        })
       
        };


          await message.channel.send(spankEmb.setDescription(`**❯ Eski ID'si (${_kur.id}) olan eski rölü => Yeni olarak <@&${rolEkle.id}> (${rolEkle.id}) güncelledim ve roller üyelere dağıtılmaya başlanıyor.**\n\n❯ \`(${_kur.uyeler.length} Kişiye Veriliyor!)\`\n\n**❯ Kanal izinleri yeni role entegre ediliyor!**`))

            });

        };  
    } 

if (command == "backup" || command == "yedek-al"){
       await deleteAll();
        await sitile();
    let spankerDatabase = JSON.parse(fs.readFileSync("./local/DATA.json", "utf8"));
    let object = JSON.stringify(spankerDatabase)
    let totalRol = message.guild.roles.cache.filter(x => x.name !== "@everyone" && !x.managed).size
    let totalMember = message.guild.members.cache.filter(x => x.roles.cache.size > 1).size;

    message.channel.send(spankEmb.setTitle(`Rol Yedekleme Bilgisi!`).setDescription(`\n❯ Tüm rollerin kanal izinleri ve üyeleri yedeklendi.\n❯ Toplam yedeklenen rol sayısı: \`${totalRol}\`\n❯ Sunucuda rolu bulunan üye sayısı: \`${totalMember}\``))
    }
if(command == "tehlike-kapat" || command == "danger-kapat" || command == "backup-aç" || command == "güvenli-aç"){
if(client.Danger == false){
message.channel.send(spankEmb.setDescription(`❯ Sunucu tehlike durumu zaten kapalı.\n❯ Rol yedekleri kullanılmaya başlandığında otomatik olarak sunucu tehlike moduna alınır!`))
}else {
client.Danger = false;
message.channel.send(spankEmb.setDescription(`❯ Sunucu tehlike durumu \`${client.Danger.toString().replace("true", "AÇIK").replace("false", "KAPALI")}\` olarak değiştirildi!\n❯ Bu andan itibaren bütün rollerin yedeklemesi alınabilir!\n❯ Rol yedekleri kullanılmaya başlandığında otomatik olarak sunucu tehlike moduna alınır!`))

}
}
if(command == "tehlike-aç" || command == "danger-aç" || command == "tehlike-ac" || command == "guvenli-kapat" || command == "backup-kapat"){
if(client.Danger == true) return message.channel.send(spankEmb.setDescription(`❯ Sunucu zaten tehlike modunda!\n❯ Rol yedekleri kullanılmaya başlandığında otomatik olarak sunucu tehlike moduna alınır!`))
else{
client.Danger= true;
message.channel.send(spankEmb.setDescription(`❯ Sunucu tehlike durumu \`${client.Danger.toString().replace("true", "AÇIK").replace("false", "KAPALI")}\` olarak değiştirildi!\n❯ Bu andan itibaren yeniden değiştirilene kadar backup alınmaz!\n\`${present.botPrefix}tehlike-kapat => Komutunu kullanarak backup almayı aktif edebilirsiniz!\`\n**Eğer rol silindikten sonra yapıyorsanız komutu asla kullanmayınız! (Developer kişiye ulaşın.)**\n❯ Rol yedekleri kullanılmaya başlandığında otomatik olarak sunucu tehlike moduna alınır!`))

}

}
if(command == "eval"){

   var code = args.join(" ");
   var evaled = eval(code);
try{
  if (typeof evaled !== "string")
  evaled = require("util").inspect(evaled);

  message.channel.send(`${clean(evaled)}`, {code:"js"});
    } catch (err) {
  message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
 function clean(text) {
   if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
     else
    return text;
}

} 
if(command == "dağıtıcı-ekle" && message.channel.type == "dm"){

if(!args[0]) return message.channel.send(spankEmb.setDescription(`>>> Bir token girmelisin.`));

if(Tokens.includes(args[0])){

Tokens = Tokens.filter(x => !x.includes(args[0]))
fs.writeFile("./Tokens.json", JSON.stringidy(Tokens), function(error){
if(error) console.log(error);
});
await message.channel.send(spankEmb.setDescription(`>>> \`${args[0]}\` Tokenli Bot Dağıtıcılardan Çıkartıldı!!`));
console.log("Dağıtıcı Çıkartıldı!")
}else{
Tokens.push(args[0]);

fs.writeFile("./Tokens.json", JSON.stringify(Tokens), function(error){
if(error) console.log(error)
});
await message.channel.send(spankEmb.setDescription(`>>> \`${args[0]}\` Tokenli Bot Dağıtıcılara Eklendi!!`));
console.log("Dağıtıcı Eklendi!")
}
}



});

clientObject[0] ? clientObject[0].on("message", async (message) => {
    if (message.author.bot ||!message.content.toLowerCase().startsWith(present.botPrefix)) return;
    if (!present.botOwners.includes(message.author.id)) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(present.botPrefix.length);
    let spankEmb = new MessageEmbed().setColor(`GOLD`).setTimestamp().setFooter(`Spanker Always Watching!`);
if(!args[0]) return message.channel.send(spankEmb.setDescription(`>>> Bir rol ID'si girmeyi unuttunuz.`))
    if(command == "m2-kur"){
        
        let spankerDatabase = JSON.parse(fs.readFileSync("./local/DATA.json", "utf8"));
        let _kur = spankerDatabase[args[0]];
        
        if(!_kur) return message.channel.send(`${args[0]} ID'li rol bulunamadı!`)
        let memberSize = spankerDatabase[args[0]].uyeler.length;
        if(memberSize == 0){
         // client.Danger = true;

            let yeni = await message.guild.roles.create({data:{
                name: _kur.isim,
                color: _kur.color,
                permissions: _kur.perms,
                position: _kur.position2,
                mentionable: _kur.mention,
                hoist: _kur.hoist,
                editable: _kur.editlimi
            }});
         let kanalizin = _kur.kanalIzin
         if(kanalizin){
        kanalizin.forEach(async function(permission, index){
        let channel = message.guild.channels.cache.get(permission.id);
        if(!channel) return;
        setTimeout(async function(){
        let assign = {};
         permission.allow.forEach(x => {
        assign[x] = true;
        });
        permission.deny.forEach(x => {
        assign[x] = false; 
        });
        channel.createOverwrite(yeni, assign);
        }, index*2250)

        })
       
        }
          await message.channel.send(spankEmb.setDescription(`**❯ Eski ID'si : (${_kur.id}) olan eski rölü => Yeni olarak <@&${yeni.id}> (${yeni.id}) güncelledim.**\n\n**❯ Kanal izinleri yeni role entegre ediliyor!**\n\n❯ \`Ancak rolde herhangi bir üye bulunamadı.\``))
        }else{
            // client.Danger = true;
            let yeni = await message.guild.roles.create({data:{
                name: _kur.isim,
                color: _kur.color,
                permissions: _kur.perms,
                position: _kur.position2,
                mentionable: _kur.mention,
                hoist: _kur.hoist,
                editable: _kur.editlimi
            }}).then(async function(rolEkle){
                
                for(let eklencek of _kur.uyeler){
                    let cagir = message.guild.members.cache.get(eklencek);
                    if(cagir == null) return console.log(`Uye sunucuda yok vermiyorum`) 
                    else{
                        setInterval(async () => {
                            await cagir.roles.add(rolEkle);
                        }, 1300);
                    }
                };
  let kanalizin = _kur.kanalIzin
         if(kanalizin){
        kanalizin.forEach(async function(permission, index){
        let channel = message.guild.channels.cache.get(permission.id);
        if(!channel) return;
        setTimeout(async function(){
        let assign = {};
         permission.allow.forEach(x => {
        assign[x] = true;
        });
        permission.deny.forEach(x => {
        assign[x] = false; 
        });
        channel.createOverwrite(rolEkle, assign);
        }, index*2250)

        })
       
        };


          await message.channel.send(spankEmb.setDescription(`**❯ Eski ID'si (${_kur.id}) olan eski rölü => Yeni olarak <@&${rolEkle.id}> (${rolEkle.id}) güncelledim ve roller üyelere dağıtılmaya başlanıyor.**\n\n❯ \`(${_kur.uyeler.length} Kişiye Veriliyor!)\`\n\n**❯ Kanal izinleri yeni role entegre ediliyor!**`))

            });

        };  
    } 
}) : console.log("Dağıtıcı Token Hatalı");

client.on("ready", function(){
setInterval(async function(){
if(client.Danger == false){
await deleteAll();
await sitile();
}
else console.log(`Sunucu Tehlikede Olduğu için Save Almıyorum!`)
},2700000);
})

client.login(present.botToken).then(x => console.log(`${client.user.username} Adıyla girildi`)).catch(err => console.log(err));





    