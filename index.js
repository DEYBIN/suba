require('dotenv').config();
// const logger = require('./logger/logger');
const app = require('./src/app');
require('./src/database');
require('./src/passport/authSecurity');

async function main(){
	await app.listen(app.get('port'));
	console.log('server on port', app.get('port'));
}
// const server = app.listen(app.get('port'),()=>{
// 	console.log('server on port', app.get('port'));
// });
main();
// const io = require('socket.io')(server);
// io.on('connection', function (socket) {
// 	let channel='uniq';
// 	socket.on('disconnect', function () {
// 		socket.leave(channel);
// 		logger.info('SocketIO > Disconnected socket ' + socket.id + ' ' + channel);
// 	});
// 	socket.on('userConnected', (data) => {		
// 		channel=data.id_orga;
// 		socket.join(channel);
// 		logger.info('SocketIO > Usuario conectado ' + socket.id + 'al canal ' + channel);
// 		socket.broadcast.in(channel).emit('message', { sala: channel});//enviá a todos los del cabal incluido a mi
// 		// socket.broadcast.to(channel)..emit('message', { sala: channel });//enviá a todos los del cabal menos a mi
// 	});
// 	socket.on('userDisconnected', (data) => {
// 		channel = data.id_orga;
// 		socket.leave(channel);
// 		socket.broadcast.in(channel).emit('usersInteraction', data.data);
// 		socket.broadcast.in(channel).emit('message', { desconectado: channel });
// 		logger.info('SocketIO > Usuario desconectado ' + socket.id + 'al canal ' + channel);
	
// 	});	
// 	socket.on('new_order',function(data) {
// 		// logger.info(data);
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('message',data.data);
// 	});	
// 	socket.on('comprobantes_insert', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('comprobantes_insert_list', data.data);
// 	});
// 	socket.on('comprobantes_update', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('comprobantes_update_list', data.data);
// 	});

// 	socket.on('clientes_insert', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('clientes_insert_list', data.data);
// 	});
// 	socket.on('clientes_update', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('clientes_update_list', data.data);
// 	});


// 	socket.on('solicitudes_insert', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('solicitudes_insert_list', data.data);
// 	});
// 	socket.on('solicitudes_update', function (data) {
// 		channel = data.id_orga;
// 		io.sockets.to(channel).emit('solicitudes_update_list', data.data);
// 	});

	
// });
