'use strict';

const 
	QueueService = require('../');

function updateUserQueue(queue){
	const 
		user = queue.id_user,
		position = queue.position;

	QueueService.read.getAllByIdUserAndHigherOrEqualPosition(user, position)
		.then((userQueue) => {
			const fixed = userQueue.toJSON();
					
			if(fixed)
				fixed.forEach((currentQueue) => {

					currentQueue.position += 1;
					QueueService.update(currentQueue);
				});
		});
}

function fixUserQueue(queue){
	QueueService.read.getAllByUserIdOrderedByPosition(queue.id_user)
		.then((userQueue) => {
			const fixed = userQueue.toJSON();

			if(fixed){
				let count = 1;
				fixed.forEach((currentQueue) => {

					if(count !== currentQueue.position)
						QueueService.update({
							id: currentQueue.id,
							id_user: currentQueue.id_user,
							position: count
						});

					count++;
				});
			}
		});
}

module.exports = {
	updateUserQueue,
	fixUserQueue
};