const Admin=require('./Admin');
const TeleBot = require('telebot');
var TelegramBot = require('node-telegram-bot-api');


const api=require('./api');
const mongoose=require('mongoose');
const got = require('got');

var bot = new TeleBot('1323798729:AAGW4CnTIk9A9Nwg7U4uwFrC65KfQxtVwvA',);

// var bot = new TeleBot('1323798729:AAGW4CnTIk9A9Nwg7U4uwFrC65KfQxtVwvA');


mongoose
	.connect(
		'mongodb+srv://denis:1111@cluster0.py4vh.mongodb.net/Users223-A?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		err => {
			if (err) {
				console.log(err);
			}
		},
	)
	.then(() => {
		console.log('Data Base connected!');
	})
	.catch(err => {
		console.log(err);
	});
bot.on('/start', (msg) => {

    console.log(msg.from.id);

     bot.sendMessage(msg.from.id, 
        `Привіт, ${ msg.from.first_name }!
        /register- Реєстрація в системі,
         обов'язкова при першому вході.
        /open-Відчинити двері!!`);
  
});
bot.on('message',(msg)=>{
    console.log(msg.chat.id);

})

 
bot.on('/register',async (msg)=>{
    let size=await Admin.find();
    if(size.length!==8){
        let status_register=await Admin.findOne({chat_id:msg.from.id});
        if(status_register===null){
            await new Admin({
                chat_id:msg.from.id,
                first_name:msg.from.first_name,
                last_name:msg.from.last_name

              
                
    
    
            }).save();
            bot.sendMessage(msg.from.id, `Ви успішно зареєстровані!! Для відкриття двері ввeдіть /open`);

    

        }
        else{  
            bot.sendMessage(msg.from.id, `Ви вже зареєстровані в Системі!`);

        }
        

    }
    else{
        bot.sendMessage(msg.from.id, `Вам обмежена реєстрація`);
    }
    
})  

bot.on('/open',async (msg)=>{

    let permission_checker=await api.checkPermission(msg.from.id);
    if (permission_checker!==false){
        console.log(msg.from.id);
        bot.sendMessage(msg.from.id, `Двері відчинено`);
        got('http://192.168.0.233:88/open', { json: true }).then(response => {
     
        }).catch(error => {
            console.log(error);
        });
        bot.sendMessage(-1001249254494, `${ msg.from.first_name },  Відчиняє двері!`);
    }
    else{
        bot.sendMessage(msg.from.id, `${ msg.from.first_name }, вам Обмежено доступ. Для реєстрації введіть /register`);
    }


   
 
  
 

})  

bot.start();
